var config = require('../config');
var express = require('express');
var router = express.Router();

// TO DO: apis.json file
router.get('/', function(req, res, next) {
  res.json({todo: 'apis.json file'});
});

// TO DO: swagger file
router.get('/swagger', function(req, res, next) {
  res.json({todo: 'swagger file'});
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
