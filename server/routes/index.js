var config = require('../config');
var fs = require('fs');
var express = require('express');
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
