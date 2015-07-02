var config = require('../config');
var express = require('express');
var async = require('async');

require('../models/service-manager.js');

var router = express.Router();

require('../models/reactions.js');
require('../models/definition.js');
require('../models/votes.js');

/**
* Fetch list of reaction definitions currently available in DRE dictionary
*/
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

  if(response.meta.offset < 0) {
    var err = new Error();
    err.status = 404;
    err.error = "No reactions can be found";
    err.message = "Bad offset query parameter - offset must be > 0";
    next(err);

  } else {

    async.series([
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

  }

});


/**
* Add a definition to a pre-existing reaction in the DRE dictionary
*/
router.post('/:id/definitions', function(req, res, next) {
  var response = new Response();
  var err = new Error();

  if (req.headers['content-type']) {
    if(req.headers['content-type'].indexOf("application/json") < 0) {
      err = new Error();
      err.status = 400;
      err.error = "Invalid content type";
      err.message = "Valid content type is 'application/json'";
      next(err);
    } else {

      if (!req.body.definition) {
        err = new Error();
        err.status = 400;
        err.error = "Definition attribute not found in body";
        err.message = "A definition value must be passed in body (ex. {'definition':'lorem ipsum'})";
        next(err);
      } else {

        var definition = req.body.definition;

        var reactionterm = new Reaction(req.params.id);

        reactionterm.find(db.connection, function(result) {

          if (!result) {
            err = new Error();
            err.status = 404;
            err.error = "Reaction cannot be found";
            err.message = "Reaction cannot be found";
            next(err);
          } else {
            if (reactionterm.definitionExists(definition)) {
              err = new Error();
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
                response.data = result;
                response.calculateExecutionTime();
                res.json(response);
              });
            }


          }

        });

    }
    }
  } else {
    err = new Error();
    err.status = 400;
    err.error = "Content type not set";
    err.message = "Valid content type is 'application/json'";
    next(err);
  }
});

/**
* Add a new reaction to the DRE dictionary
*/
router.post('/', function(req, res, next) {

  var response = new Response();
  var err = new Error();

  if (req.headers['content-type']) {
    if(req.headers['content-type'].indexOf("application/json") < 0) {
      err = new Error();
      err.status = 400;
      err.error = "Invalid content type";
      err.message = "Valid content type is 'application/json'";
      next(err);
    } else {

      if(Object.keys(req.body).length !== 1 ||
         req.body.reaction === null ||
         req.headers['content-type'].indexOf("application/json") < 0 ||
         typeof req.body.reaction !== "string") {
        err = new Error();
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
                response.data = result;
                response.calculateExecutionTime();
                res.json(response);
              });
            });

          } else {
            err = new Error();
            err.status = 422;
            err.error = "Duplicate Reaction";
            err.message = "The reaction that you are trying to create already exists" +
                          " and cannot be created again.";
            next(err);
          }
        });

      }
      }
    } else {
      err = new Error();
      err.status = 400;
      err.error = "Content type not set";
      err.message = "Valid content type is 'application/json'";
      next(err);
    }
});

/**
* Fetch definition of a reaction stored within the DRE dictionary
*/
router.get('/:id', function(req, res, next) {
  var response = new Response();
  var err = new Error();

  var reactionterm = new Reaction(decodeURIComponent(req.params.id));

  reactionterm.find(db.connection, function(reaction) {
    if(reaction === null) {
      err = new Error();
      err.status = 404;
      err.error = "Reaction Not Found";
      err.message = "The reaction that you were looking for could not be found.";
      next(err);
    } else {
      response.data = reaction;
      response.calculateExecutionTime();
      res.json(response);

    }
  });


});

/**
* Increment the vote up / down for a specific reaction definition
*/
router.put('/:id/definitions/:index', function(req, res, next) {

  var response = new Response();
  var err = new Error();

  if (req.headers['content-type']) {
   if(req.headers['content-type'].indexOf("application/json") < 0) {
     err = new Error();
     err.status = 400;
     err.error = "Invalid content type";
     err.message = "Valid content type is 'application/json'";
     next(err);
   } else {

      var definitionIndex = parseInt(req.params.index);

      // ensure proper content type
      if (req.headers['content-type'].indexOf("application/json") < 0) {
        err = new Error();
        err.status = 400;
        err.error = "Invalid content type";
        err.message = "Valid content type is 'application/json'";
        next(err);
      } else {

        // ensure body has vote key value
        if (!req.body.vote) {
          err = new Error();
          err.status = 400;
          err.error = "Vote attribute not found in body";
          err.message = "A vote attribute must be passed in body (ex. {'vote':'up'}) - valid values are 'up' or 'down'";
          next(err);
        } else {

          var vote = req.body.vote.toLowerCase();
          var reactionterm = new Reaction(decodeURIComponent(req.params.id));

          // ensure valid value for vote (up | down)
          if (!(vote === 'up' || vote === 'down')) {
            err = new Error();
            err.status = 400;
            err.error = "Vote attribute '" + vote  + "' not valid";
            err.message = "A vote attribute must be passed in body (ex. {'vote':'up'}) - valid values are 'up' or 'down'";
            next(err);
          } else {

            reactionterm.find(db.connection, function(reaction) {
              if(reaction === null) {
                err = new Error();
                err.status = 404;
                err.error = "Reaction Not Found";
                err.message = "The reaction that you were looking for could not be found.";
                next(err);
              } else {
                if (!reactionterm.definitionIndexExists(definitionIndex)) {
                  err = new Error();
                  err.status = 404;
                  err.error = "Definition at that index does not exist";
                  err.message = "The definition at that index does not exist";
                  next(err);
                } else {

                  reactionterm.vote(definitionIndex, vote);

                  reactionterm.upsert(db.connection, function (result) {
                    response.data = result;
                    response.calculateExecutionTime();
                    res.json(response);
                  });

                }

              }
            });

          }
        }

      }
    }

    } else {
      err = new Error();
      err.status = 400;
      err.error = "Content type not set";
      err.message = "Valid content type is 'application/json'";
      next(err);
    }

});

/**
* Remove a reaction and associated definitions from DRE dictionary
*/
router.delete('/:id', function(req, res, next) {

  var reactionterm = new Reaction(decodeURIComponent(req.params.id));
  var err = new Error();

  reactionterm.find(db.connection, function(reaction) {
    if(reaction === null) {
      err = new Error();
      err.status = 404;
      err.error = "Reaction Not Found";
      err.message = "The reaction that you were looking for could not be found.";
      next(err);
    } else {
      reaction.remove(db.connection, function () {
        res.status(204);
        res.json();
      });
    }
  });


});

module.exports = router;
