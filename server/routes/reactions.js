var config = require('../config');

var express = require('express');
var _ = require('lodash');
var request = require('request');
var fs = require('fs');
var xml2js = require('xml2js');

var async = require('async')

var router = express.Router();

var MongoClient = require('mongodb').MongoClient
var mongo_url = config.mongo + config.db;

require('../models/reactions.js');
require('../models/definition.js');
require('../models/votes.js');

// TO DO: GET list of reactions
router.get('/', function(req, res, next) {
  var example = ["UTERINE HAEMORRHAGE","BLOOD CULTURE POSITIVE","CONVULSION","DEPRESSED LEVEL OF CONSCIOUSNESS","ELECTROENCEPHALOGRAM ABNORMAL","FUNGAL INFECTION","HYPOTENSION","HYPOXIA","MENTAL STATUS CHANGES","MULTI-ORGAN FAILURE","PANCREATITIS","SEPSIS","SPUTUM CULTURE POSITIVE","BRADYCARDIA","EMBOLISM","ILEUS PARALYTIC","INTESTINAL ISCHAEMIA","OXYGEN SATURATION DECREASED","RENAL FAILURE ACUTE","RENAL TUBULAR NECROSIS","AIDS ENCEPHALOPATHY"];
  res.json(example);
});

// TO DO: Post new or update reaction definition
router.post('/', function(req, res, next) {
  // Validate that incoming request is ok... and not a duplicate
  //res.json({todo: 'post reaction definition'});
  var reaction = new Reaction();

  if(Object.keys(req.body).length != 1 ||
     req.body.reaction == null ||
     typeof req.body.reaction != "string") {
    var err = new Error();
    err.status = 400;
    err.error = "Invalid Request Body";
    err.message = "Either the incorrect number of attributes were provided or" +
                  " the 'reaction' attribute could not be found, or the" +
                  " 'reaction' attribute wasn't properly formatted.";
    next(err);
  }

  // Tries to find reaction in collection (returns the record if found)
  var findReaction = function(db, callback) {
    var collection = db.collection('reactions');
    collection.findOne({'reaction': req.body.reaction}, function(err, reaction) {
      callback(reaction);
    });
  }

  // Inserts reaction into Mongo
  var insertReaction = function(db, callback) {
    var collection = db.collection('reactions');
      collection.insert([
        reaction
      ], function(err, result) {
        console.log(err);
        callback(result);
      });

  }

  // Retrieves definition available from Merriam Webster Medical Dictionary API
  var getTermDefinitionFromMerriamWebsterMedical = function (callback) {


    var url = "http://www.dictionaryapi.com/api/v1/references/medical/xml/" + encodeURIComponent(reaction.reaction.toLowerCase()) + "?key=" + config.dictionaryapi_key;


    request(url, function (error, response, body) {



      if (!error && response.statusCode == 200) {

        var parser = new xml2js.Parser({ignoreAttrs: false});

        parser.parseString(body, function (err, result) {

          if (result) {

          _.forEach(result.entry_list.entry, function(v,k) {

            if (v['$'].id == reaction.reaction.toLowerCase()) {

                if (v.def) {

                  if (Array.isArray(v.def[0].sensb[0].sens)) {

                      _.forEach(v.def[0].sensb, function (v,k) {

                        if (v.sens[0].dt[0]['_']) {

                          if (typeof v.sens[0].dt[0]['_'] == "string") {

                            var definition = new Definition;
                            var dt = new Date();

                            definition.definition = v.sens[0].dt[0]['_'];
                            definition.source = 'dictionaryapi.com';
                            definition.created_at = dt.getTime();
                            definition.created_by = "";
                            definition.votes = new Votes();

                            reaction.addDefinition(definition);

                          }

                        } else {
                          var def = {};
                          if (typeof v.sens[0].dt[0] == "string") {

                            var definition = new Definition;
                            var dt = new Date();

                            definition.definition = v.sens[0].dt[0];
                            definition.source = 'dictionaryapi.com';
                            definition.created_at = dt.getTime();
                            definition.created_by = "";
                            definition.votes = new Votes();
                            reaction.addDefinition(definition);

                          }

                        }

                      });

                    } else {

                      if (typeof v.def[0].sensb[0].sens[0].dt == "string") {

                        var definition = new Definition;
                        var dt = new Date();

                        definition.definition = v.def[0].sensb[0].sens[0].dt;
                        definition.source = 'dictionaryapi.com';
                        definition.created_at = dt.getTime();
                        definition.created_by = "";
                        definition.votes = new Votes();
                        reaction.addDefinition(definition);

                      }

                      }

                    }

                }
            });
            }

          });

          callback(null);

      } else {
        callback(null);
      }
    })
  }

  // Retrieves definition available from Wordnik API
  var getDefinitionFromWordnik = function (callback) {
    var url = "http://api.wordnik.com:80/v4/word.json/" + encodeURIComponent(reaction.reaction.toLowerCase()) + "/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=" + config.wordnikapi_key ;

    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var deflist = JSON.parse(body);
        if (deflist[0]) {
          _.forEach(deflist, function(v,k) {

            var definition = new Definition;

            if (v.partOfSpeech == "noun") {
              var dt = new Date();

              definition.definition = v.text;
              definition.source = 'wordnik.com';
              definition.created_at = dt.getTime();
              definition.created_by = "";
              definition.votes = new Votes();

              reaction.addDefinition(definition);
            }

          });

        }
       callback();

      } else {
        callback();
      }
    })

  }

  // - Establish connection to mongo
  // - Check to see if reaction exists
  // - If it does not exist, find definitions and insert

  MongoClient.connect(mongo_url, function(err, db) {

    if (err) {
      var err = new Error();
      err.status = 500;
      err.error = "Internal Error";
      next(err);
    }

    if (!err) {


      findReaction(db, function(result) {

        if(result) {
          var err = new Error();
          err.status = 400;
          err.error = "Duplicate Reaction";
          err.message = "The reaction that you are trying to create already exists" +
                        " and cannot be created again.";

          next(err);
        } else {

          var dt = new Date();

          reaction.reaction = req.body.reaction;
          reaction.definitions = [];
          reaction.created_at = dt.getTime();
          reaction.created_by = "";


          async.series([
              function(callback){
                getTermDefinitionFromMerriamWebsterMedical(function (result) {
                  callback(null);
                });
              },
              function(callback){
                getDefinitionFromWordnik(function (result) {
                  callback(null);
                });
              }
          ],

          // insert into mongo
          function(err, results){

            insertReaction(db, function(result) {
               console.log(result);
                console.log('inserting');

                res.json(reaction);

            });


          });

        }
     });

    }

 });

});

// TO DO: Get reaction defintion
router.get('/:id', function(req, res, next) {
  MongoClient.connect(mongo_url, function(err, db) {

    // Tries to find reaction in collection (returns the record if found)
    var findReaction = function(term, db, callback) {
      var collection = db.collection('reactions');
      collection.findOne({'reaction': term.toLowerCase()}, function(err, reaction) {
        callback(reaction);
      });
    };

    if(req.params.id == null || typeof req.params.id == "object") {
      var err = new Error();
      err.status = 500;
      err.error = "Unknown Server Error";
      err.message = "Please retry your request again or contact us if the"
                    + " problem persists";
      next(err);
    }
    findReaction(req.params.id, db, function(result) {
      if(result === null) {
        var err = new Error();
        err.status = 404;
        err.error = "Reaction Not Found";
        err.message = "The reaction that you were looking for could not be found.";
        next(err);
      } else {
        res.json(result);
      }
    });
  });
});

// TO DO: Put reaction defintion
router.put('/:id', function(req, res, next) {
  var id = req.params.id;
  var example = JSON.parse('{"reaction":"' + id + '","terms":[{"term":"urosepsis","text":"sepsis caused by bacteria from the urinary tract invading the bloodstream","attributionText":"from Wiktionary, Creative Commons Attribution/Share-Alike License","source":"wordnik"},{"term":"urosepsis","text":"sepsis caused by bacteria from the urinary tract invading the bloodstream","attributionText":"from Wiktionary, Creative Commons Attribution/Share-Alike License","source":"wordnik"}]}');
  res.json(example);
});

// TO DO: Delete reaction definition
router.delete('/:id', function(req, res, next) {
  res.json({todo: 'delete reaction definition ' +  req.params.id});
});


module.exports = router;
