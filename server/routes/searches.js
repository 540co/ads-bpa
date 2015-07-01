var express = require('express');
var async = require('async');

var router = express.Router();

require('../models/searches.js');
require('../models/response.js');

/**
* Record a search term to track metrics of when different search terms
* are provided by end user
*/
router.post('/', function(req, res, next) {

  // ensure proper content type
  if (req.headers['content-type'].indexOf("application/json") < 0) {
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

      var response = new Response();

      var searchterm = req.body.search;

      var searches = new Searches(searchterm);

      searches.incrementCount(db.connection, function (result) {
        response.data = result;
        response.calculateExecutionTime();
        res.json(response);
      });


    }

  }

});

/**
* Fetch list of search terms orderd from terms ordered by count
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
    err.error = "No searches can be found";
    err.message = "Bad offset query parameter - offset must be > 0";
    next(err);

  } else {

    async.series([
        // Get count from cursor
        function(callback){
          Searches.getCount(db.connection, function (count) {
            response.meta.total_count = count;
            callback();
          });
        },
        function(callback){
          Searches.getList(db.connection, response.meta.limit, response.meta.offset, function (data) {
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

module.exports = router;
