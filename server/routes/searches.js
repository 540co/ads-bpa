var config = require('../config');
var fs = require('fs');
var express = require('express');
var async = require('async');
var _ = require('lodash');

var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var mongo_url = config.mongo + config.db;

require('../models/search.js');
require('../models/response.js');

// TO DO: apis.json file
router.post('/', function(req, res, next) {

  var startTime = new Date().getTime();
  var response = new Response();

  // ensure proper content type
  if (req.headers['content-type'] !== 'application/json') {
    var err = new Error();
    err.status = 400;
    err.error = "Invalid content type";
    err.message = "Valid content type is 'application/json'";
    next(err);
  } else {

    if (!req.body.search) {
      var err = new Error();
      err.status = 400;
      err.error = "A search attribute was not found in the body";
      err.message = "A search key/value must be passed in body (ex. {'search':'ibuprofen'})";
      next(err);
    } else {

      var search = new Search();

      search.search = req.body.search;

      var incrementCount = function(search, db, callback) {
        var collection = db.collection('search');
        collection.findAndModify({search: search.search.toLowerCase()}, {}, {$inc: {count:1}}, {upsert:true}, function(err, object) {
          callback(object)
        });
      };

      MongoClient.connect(mongo_url, function(err, db) {
        incrementCount(search, db, function(searchDocument) {
          var endTime = new Date().getTime();
          response.meta.execution_time = String ((endTime - startTime) / 1000) + 's'  ;

          // The find and upsert capability starts the first count at 0, so
          // response is incremented by 1 before responding to API consumer
          if (searchDocument === null ||
              searchDocument.value === null ||
             !searchDocument.value.count) {
            response.data.search = search.search;
            response.data.count = 1;

          } else {
            response.data.search = search.search;
            response.data.count = searchDocument.value.count + 1;
          }

          db.close();
          res.json(response);

        });
      });

    }

  }

});

router.get('/', function(req, res, next) {

    var response = new Response();
    var startTime = new Date().getTime();

    if (!req.query.limit) {req.query.limit = 25;} else {req.query.limit = parseInt(req.query.limit);}

    if (req.query.limit < 1) {
      req.query.limit = 1;
    }

    if (req.query.limit > 200) {
      req.query.limit = 200;
    }

    if (!req.query.offset) {
      req.query.offset = 0;
    } else {
      req.query.offset = parseInt(req.query.offset);
    }

    var findAll = function(db, callback) {

      var collection = db.collection('search');

      var cursor = collection.find({ }).sort({count:-1});

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

          if (!response.data) {
            var endTime = new Date().getTime();
            response.meta.execution_time = String ((endTime - startTime) / 1000) + 's'  ;

            res.status(404);
            res.json(response);
            db.close();

          } else {

           // ... then remove the _id keys from the results and send response back
            _.forEach(response.data, function(v, k) {
              delete response.data[k]._id;
            })

            var endTime = new Date().getTime();
            response.meta.execution_time = String ((endTime - startTime) / 1000) + 's'  ;

            res.json(response);
            db.close();

          }

      });

    }

    MongoClient.connect(mongo_url, function(err, db) {
      findAll(db, function() {


      });
    });

});

module.exports = router;
