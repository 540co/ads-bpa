var config = require('../config');
var fs = require('fs');
var express = require('express');
var jade = require('jade');
var request = require('request');
var router = express.Router();

// TO DO: apis.json file
router.get('/', function(req, res, next) {
  res.json({todo: 'apis.json file'});
});

// TO DO: apis.json file
router.get('/swagger', function(req, res, next) {
  var swagger = JSON.parse(fs.readFileSync('./routes/swagger.json'));
  swagger.host = config.host;
  swagger.schemes = config.schemes;
  res.json(swagger);
});

// View reaction definitions / votes currently stored in database
router.get('/admin', function(req, res, next) {

  res.render('admin', config);

});

// View reaction definitions / votes currently stored in database
router.get('/admin/reactions', function(req, res, next) {

  var url = config.schemes[0] + '://' + config.host + '/api/reactions?limit=10000';

  request(url, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      res.render('admin-reactions', JSON.parse(body));

    }

  });

});

// View top searches (admin view)
router.get('/admin/searches', function(req, res, next) {

  var url = config.schemes[0] + '://' + config.host + '/api/searches?limit=500';

  request(url, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      res.render('admin-searches', JSON.parse(body));

    }

  });

});


// Test Mongo Connection
router.get('/mongodb', function(req, res, next) {

  console.log(config);

  var MongoClient = require('mongodb').MongoClient,
      assert = require('assert');

  var url = config.mongo + 'myproject';

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    res.json({message:'Connected correctly to server'});
    db.close();
  });
});

module.exports = router;
