var config = require('../config');
var express = require('express');
var _ = require('lodash');
var request = require('request');
var fs = require('fs');
var xml2js = require('xml2js');
var async = require('async');


var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var mongo_url = config.mongo + config.db;

var db = {};

require('../models/reactions.js');
require('../models/definition.js');
require('../models/votes.js');

// GET list of reactions
router.get('/', function(req, res, next) {

  var startTime = new Date().getTime();

  var response = {};
  response.meta = {};
  response.data = [];

  if (!req.query.limit) {req.query.limit = 25;} else {req.query.limit = parseInt(req.query.limit);}

  if (req.query.limit < 1) {
    req.query.limit = 1;
  }

  if (req.query.limit > 200) {
    req.query.limit = 200;
  }

  if (!req.query.offset) {req.query.offset = 0;} else {req.query.offset = parseInt(req.query.offset);}

  var findAll = function(db, callback) {

    var collection = db.collection('reactions');

    var cursor = collection.find({ });

    async.series([

        // Get count from cursor
        function(callback){
          cursor.count(function(err, count) {
            response.meta.limit = req.query.limit;
            response.meta.offset = req.query.offset;
            response.meta.total_count = count;

          });
          callback(null);
        },

        // Get results from curor
        function(callback){
          cursor.limit(req.query.limit);
          cursor.skip(req.query.offset);

          cursor.toArray(function(err, result) {
            response.data = result;
            callback(null);
          });
        }

      ], function(err){

        db.close();

        var endTime;
        if (!response.data) {
          endTime = new Date().getTime();
          response.meta.execution_time = String ((endTime - startTime) / 1000) + 's'  ;

          res.status(404);
          res.json(response);

        } else {

         // ... then remove the _id keys from the results and send response back
          _.forEach(response.data, function(v, k) {
            delete response.data[k]._id;
          });

          endTime = new Date().getTime();
          response.meta.execution_time = String ((endTime - startTime) / 1000) + 's'  ;

          res.json(response);

        }



    });

  };

  MongoClient.connect(mongo_url, function(err, db) {
    findAll(db, function() {

    });
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

    // ensure body has vote key value
    if (!req.body.definition) {
      var err = new Error();
      err.status = 400;
      err.error = "Definition attribute not found in body";
      err.message = "A definition value must be passed in body (ex. {'definition':'lorem ipsum'})";
      next(err);
    } else {

      var definition = req.body.definition;

      // Tries to find reaction in collection (returns the record if found)
      var findReaction = function(term,db, callback) {
        var collection = db.collection('reactions');
        collection.findOne({'reaction': term.toLowerCase()}, function(err, reaction) {
          callback(reaction);
        });
      };

      // Update reaction with new definition
      var updateReaction = function(reaction, reaction_document, db, callback) {
        var collection = db.collection('reactions');
        collection.update({reaction:reaction.toLowerCase()}, {$set: reaction_document}, {}, function(err, result) {
          if (err) {
              var err = new Error();
              err.status = 500;
              err.error = "Internal error";
              next(err);
          } else {
            callback(result);
          }

        });

      };

      MongoClient.connect(mongo_url, function(err, db) {
        if (err) {
          var err = new Error();
          err.status = 500;
          err.error = "Internal error";
          next(err);
        } else {

          // find reaction in requst
          findReaction(id, db, function (reaction) {
            if(reaction === null) {
              var err = new Error();
              err.status = 404;
              err.error = "Reaction Not Found";
              err.message = "The reaction that you were looking for could not be found.";
              db.close();
              next(err);
            } else {

              // check if definition already exists
              var duplicateFound = false;

              _.forEach(reaction.definitions, function(def,def_index) {
                if (req.body.definition === def.definition) {
                  duplicateFound = true;
                }
              });

              if (duplicateFound) {
                res.status(422);
                res.json({message:'duplicate definition found'});
              } else {

                // Create new definition
                var newDefinition = new Definition();
                newDefinition.definition = definition;
                newDefinition.source = "custom";
                newDefinition.created_at = new Date().getTime();
                newDefinition.created_by = "DRE App";

                newDefinition.votes = new Votes();

                // Push definition onto end of stack of definitions
                reaction.definitions.push(newDefinition);

                // Update database
                updateReaction(id, reaction, db, function(err) {
                  delete reaction._id;
                  res.json(reaction);
                  db.close();
                });

              }

            }

          });
        }
      });

    }
  }

});


// POST new or update reaction definition
router.post('/', function(req, res, next) {
  // Validate that incoming request is ok... and not a duplicate
  //res.json({todo: 'post reaction definition'});
  var reaction = new Reaction();

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
  }

  // Tries to find reaction in collection (returns the record if found)
  var findReaction = function(db, callback) {
    var collection = db.collection('reactions');
    collection.findOne({'reaction': req.body.reaction.toLowerCase()}, function(err, reaction) {
      callback(reaction);
    });
  };

  // Inserts reaction into Mongo
  var insertReaction = function(db, callback) {
    var collection = db.collection('reactions');

      collection.insert([
        reaction
      ], function(err, result) {

        db.close();
        callback(result);

      });
  };

  // Retrieves definition available from Merriam Webster Medical Dictionary API
  var getTermDefinitionFromMerriamWebsterMedical = function (callback) {


    var url = "http://www.dictionaryapi.com/api/v1/references/medical/xml/" + encodeURIComponent(reaction.reaction.toLowerCase()) + "?key=" + config.dictionaryapi_key;


    request(url, function (error, response, body) {

      if (!error && response.statusCode === 200) {

        var parser = new xml2js.Parser({ignoreAttrs: false});

        parser.parseString(body, function (err, result) {

          if (result) {

          _.forEach(result.entry_list.entry, function(v,k) {

            if (v['$'].id === reaction.reaction.toLowerCase()) {

                if (v.def) {

                  if (Array.isArray(v.def[0].sensb[0].sens)) {

                      _.forEach(v.def[0].sensb, function (v,k) {

                        if (v.sens[0].dt[0]['_']) {

                          if (typeof v.sens[0].dt[0]['_'] === "string") {

                            var definition = new Definition();
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
                          if (typeof v.sens[0].dt[0] === "string") {

                            var definition = new Definition();
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

                      if (typeof v.def[0].sensb[0].sens[0].dt === "string") {

                        var definition = new Definition();
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
    });
  };

  // Retrieves definition available from Wordnik API
  var getDefinitionFromWordnik = function (callback) {
    var url = "http://api.wordnik.com:80/v4/word.json/" + encodeURIComponent(reaction.reaction.toLowerCase()) + "/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=" + config.wordnikapi_key ;

    request(url, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var deflist = JSON.parse(body);
        if (deflist[0]) {
          _.forEach(deflist, function(v,k) {

            var definition = new Definition();

            if (v.partOfSpeech === "noun") {
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
    });

  };

  // - Establish connection to mongo
  // - Check to see if reaction exists
  // - If it does not exist, find definitions and insert
if(!err) {
  MongoClient.connect(mongo_url, function(err, db) {
    if (err) {
      var err = new Error();
      err.status = 500;
      err.error = "Internal Error";
      next(err);
    }
    else {


      findReaction(db, function(result) {

        if(result) {

          var err = new Error();
          err.status = 422;
          err.error = "Duplicate Reaction";
          err.message = "The reaction that you are trying to create already exists" +
                        " and cannot be created again.";
          db.close();
          next(err);
        } else {

          var dt = new Date();

          reaction.reaction = req.body.reaction.toLowerCase();
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
                delete reaction._id;
                res.json(reaction);

            });


          });

        }
     });

    }

   });
 }

});

// GET reaction defintion
router.get('/:id', function(req, res, next) {
  MongoClient.connect(mongo_url, function(err, db) {

    // Tries to find reaction in collection (returns the record if found)
    var findReaction = function(term, db, callback) {
      var collection = db.collection('reactions');
      collection.findOne({'reaction': term.toLowerCase()}, function(err, reaction) {

        callback(reaction);
      });
    };

    if(req.params.id === null || typeof req.params.id === "object") {
      var err = new Error();
      err.status = 500;
      err.error = "Unknown Server Error";
      err.message = "Please retry your request again or contact us if the" +
                    " problem persists";
      next(err);
    }

    findReaction(decodeURIComponent(req.params.id.toLowerCase()), db, function(result) {
      if(result === null) {
        var err = new Error();
        err.status = 404;
        err.error = "Reaction Not Found";
        err.message = "The reaction that you were looking for could not be found.";
        db.close();
        next(err);
      } else {
        delete result._id;
        res.json(result);
        db.close();
      }
    });
  });
});


// PUT Reaction Definition Vote Up / Down
router.put('/:id/definitions/:index', function(req, res, next) {

  var id = req.params.id;
  var definitionIndex = req.params.index;

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

      // ensure valid value for vote (up | down)
      if (!(vote === 'up' || vote === 'down')) {
        var err = new Error();
        err.status = 400;
        err.error = "Vote attribute '" + vote  + "' not valid";
        err.message = "A vote attribute must be passed in body (ex. {'vote':'up'}) - valid values are 'up' or 'down'";
        next(err);
      } else {

        // Tries to find reaction in collection (returns the record if found)
        var findReaction = function(term,db, callback) {
          var collection = db.collection('reactions');
          collection.findOne({'reaction': term.toLowerCase()}, function(err, reaction) {
            callback(reaction);
          });
        };

        // Update reaction with updated votes
        var updateReaction = function(reaction, reaction_document, db, callback) {
          var collection = db.collection('reactions');
          collection.update({reaction:reaction}, {$set: reaction_document}, {}, function(err, result) {
            if (err) {
                var err = new Error();
                err.status = 500;
                err.error = "Internal error";
                next(err);
            } else {
              callback(result);
            }

          });

        };


        MongoClient.connect(mongo_url, function(err, db) {
          if (err) {
            var err = new Error();
            err.status = 500;
            err.error = "Internal error";
            next(err);
          } else {

            // find reaction in requst
            findReaction(id, db, function (reaction) {
              if(reaction === null) {
                var err = new Error();
                err.status = 404;
                err.error = "Reaction Not Found";
                err.message = "The reaction that you were looking for could not be found.";
                db.close();
                next(err);
              } else {

                // check if definition exists - error if not
                if(!reaction.definitions[definitionIndex]) {
                  var err = new Error();
                  err.status = 404;
                  err.error = "Definition [" + definitionIndex + "] not found";
                  err.message = "The definition index provided was not found.";
                  db.close();
                  next(err);

                } else {

                  // update update count of ups / downs based upon request
                  if(vote == 'up') {
                    reaction.definitions[definitionIndex].votes.ups++;
                  }

                  if(vote == 'down') {
                    reaction.definitions[definitionIndex].votes.downs++;
                  }

                  // update the reaction document and respond
                  updateReaction(reaction.reaction, reaction, db, function (result) {
                    delete reaction['_id'];
                    db.close();
                    res.json(reaction);
                  });

                }

              }
            });
          }
        });

      }

    }

  }


});

// TO DO: Put reaction defintion
router.put('/:id', function(req, res, next) {
  var id = req.params.id;
  var example = JSON.parse('{"reaction":"' + id + '","terms":[{"term":"urosepsis","text":"sepsis caused by bacteria from the urinary tract invading the bloodstream","attributionText":"from Wiktionary, Creative Commons Attribution/Share-Alike License","source":"wordnik"},{"term":"urosepsis","text":"sepsis caused by bacteria from the urinary tract invading the bloodstream","attributionText":"from Wiktionary, Creative Commons Attribution/Share-Alike License","source":"wordnik"}]}');
  res.json(example);
});

// TO DO: Delete reaction definition
router.delete('/:id', function(req, res, next) {
  MongoClient.connect(mongo_url, function(err, db) {

    // Tries to find reaction in collection (returns the record if found)
    var findReaction = function(term, db, callback) {
      var collection = db.collection('reactions');
      collection.findOneAndDelete({'reaction': term.toLowerCase()}, function(err, reaction) {
        callback(reaction);
      });
    };

    if(req.params.id === null || typeof req.params.id === "object") {
      var err = new Error();
      err.status = 500;
      err.error = "Unknown Server Error";
      err.message = "Please retry your request again or contact us if the" +
                    " problem persists";
      next(err);
    }

    findReaction(decodeURIComponent(req.params.id.toLowerCase()), db, function(result) {
      res.status(204);
      res.json();
    });

    db.close();
  });
});


module.exports = router;
