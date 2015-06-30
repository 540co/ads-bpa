var config = require('../config');
var express = require('express');
var _ = require('lodash');
var request = require('request');
var fs = require('fs');
var xml2js = require('xml2js');
var async = require('async');

var async = require('async');

require('../models/service-manager.js');

var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var mongo_url = config.mongo + config.db;

require('../models/reactions.js');
require('../models/definition.js');
require('../models/votes.js');

// GET list of reactions
router.get('/', function(req, res, next) {

  var response = new Response();

  if (!req.query.limit) {response.meta.limit = 25;} else {response.meta.limit = parseInt(req.query.limit);}

  if (response.meta.limit < 1) {
    response.meta.limit = 1;
  }

  if (response.meta.limit > 200) {
    response.meta.limit = 200;
  }

  if (!req.query.offset) {
    response.meta.offset = 0;
  } else {
    response.meta.offset = parseInt(req.query.offset);
  }

  async.series([
      // Get count from cursor
      function(callback){
        Reaction.getCount(db.connection, function (count) {
          response.meta.total_count = count;
          callback();
        });
      },
      function(callback){
        Reaction.getList(db.connection, response.meta.limit, response.meta.offset, function (data) {
          response.data = data;
          callback();
        });
      }

  ], function () {
    response.calculateExecutionTime();
    res.json(response);
  });

});

// POST definition to reaction
router.post('/:id/definitions', function(req, res, next) {

  var id = req.params.id;

  // ensure proper content type
  if (req.headers['content-type'] !== 'application/json') {
    var err = new Error();
    err.status = 400;
    err.error = "Invalid content type";
    err.message = "Valid content type is 'application/json'";
    next(err);
  } else {

    if (!req.body.definition) {
      var err = new Error();
      err.status = 400;
      err.error = "Definition attribute not found in body";
      err.message = "A definition value must be passed in body (ex. {'definition':'lorem ipsum'})";
      next(err);
    } else {

      var definition = req.body.definition;

      var reactionterm = new Reaction(req.params.id);

      reactionterm.find(db.connection, function(result) {

        if (!result) {
          var err = new Error();
          err.status = 404;
          err.error = "Reaction cannot be found";
          err.message = "Reaction cannot be found";
          next(err);
        } else {
          if (reactionterm.definitionExists(definition)) {
            var err = new Error();
            err.status = 422;
            err.error = "Duplicate Definition Exists";
            err.message = "Duplicate Definition Exists";
            next(err);
          } else {
            var def = new Definition();
            def.definition = definition;
            def.source = 'dre_app';
            def.created_at = new Date().getTime();

            reactionterm.addDefinition(def);

            reactionterm.upsert(db.connection, function (result) {
              res.json(result);
            });
          }


        }

      });

  }

}

});


// POST new or update reaction definition
router.post('/', function(req, res, next) {

  if(Object.keys(req.body).length !== 1 ||
     req.body.reaction === null ||
     req.headers['content-type'] !== 'application/json' ||
     typeof req.body.reaction !== "string") {
    var err = new Error();
    err.status = 400;
    err.error = "Invalid Request Body";
    err.message = "Either the incorrect number of attributes were provided or" +
                  " the 'reaction' attribute could not be found, or the" +
                  " 'reaction' attribute wasn't properly formatted.";
    next(err);
  } else {

    var reactionterm = new Reaction(req.body.reaction);

    reactionterm.find(db.connection, function(result) {

      if (!result) {
        async.series([

          function(callback){
            serviceManager.getDefinitionsFromDictionaryApi(reactionterm.reaction, config.dictionaryapi_key, function (result) {
              reactionterm.addDefinition(result);
              callback();
            });
          },
          function(callback){
            serviceManager.getDefinitionsFromWordnikApi(reactionterm.reaction, config.wordnikapi_key, function (result) {
              reactionterm.addDefinition(result);
              callback();
            });
          }

        ],
        function(err, results){
          reactionterm.upsert(db.connection, function (result) {
            res.json(result);
          })
        });

      } else {
        var err = new Error();
        err.status = 422;
        err.error = "Duplicate Reaction";
        err.message = "The reaction that you are trying to create already exists" +
                      " and cannot be created again.";
        next(err);
      }
    });

  }
});

// GET reaction defintion
router.get('/:id', function(req, res, next) {

  var reactionterm = new Reaction(decodeURIComponent(req.params.id));

  reactionterm.find(db.connection, function(reaction) {
    if(reaction === null) {
      var err = new Error();
      err.status = 404;
      err.error = "Reaction Not Found";
      err.message = "The reaction that you were looking for could not be found.";
      next(err);
    } else {

      res.json(reaction);
    }
  });


});


// PUT Reaction Definition Vote Up / Down
router.put('/:id/definitions/:index', function(req, res, next) {

  var id = req.params.id;
  var definitionIndex = parseInt(req.params.index);

  // ensure proper content type
  if (req.headers['content-type'] !== 'application/json') {
    var err = new Error();
    err.status = 400;
    err.error = "Invalid content type";
    err.message = "Valid content type is 'application/json'";
    next(err);
  } else {

    // ensure body has vote key value
    if (!req.body.vote) {
      var err = new Error();
      err.status = 400;
      err.error = "Vote attribute not found in body";
      err.message = "A vote attribute must be passed in body (ex. {'vote':'up'}) - valid values are 'up' or 'down'";
      next(err);
    } else {

      var vote = req.body.vote.toLowerCase();
      var reactionterm = new Reaction(decodeURIComponent(req.params.id));

      // ensure valid value for vote (up | down)
      if (!(vote === 'up' || vote === 'down')) {
        var err = new Error();
        err.status = 400;
        err.error = "Vote attribute '" + vote  + "' not valid";
        err.message = "A vote attribute must be passed in body (ex. {'vote':'up'}) - valid values are 'up' or 'down'";
        next(err);
      } else {

        reactionterm.find(db.connection, function(reaction) {
          if(reaction === null) {
            var err = new Error();
            err.status = 404;
            err.error = "Reaction Not Found";
            err.message = "The reaction that you were looking for could not be found.";
            next(err);
          } else {
            if (!reactionterm.definitionIndexExists(definitionIndex)) {
              var err = new Error();
              err.status = 404;
              err.error = "Definition at that index does not exist";
              err.message = "The definition at that index does not exist";
              next(err);
            } else {

              reactionterm.vote(definitionIndex, vote);

              reactionterm.upsert(db.connection, function (result) {
                res.json(result);
              })

            }

          }
        });

      }
    };

  };


});

// DELETE Reaction
router.delete('/:id', function(req, res, next) {

  var reactionterm = new Reaction(decodeURIComponent(req.params.id));

  reactionterm.find(db.connection, function(reaction) {
    if(reaction === null) {
      var err = new Error();
      err.status = 404;
      err.error = "Reaction Not Found";
      err.message = "The reaction that you were looking for could not be found.";
      next(err);
    } else {
      reaction.remove(db.connection, function (result) {
        res.status(204);
        res.json();
      })
    }
  });


});


module.exports = router;
