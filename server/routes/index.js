var config = require('../config');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

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
