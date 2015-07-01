var config = require('../config');
var fs = require('fs');
var express = require('express');
var jade = require('jade');
var request = require('request');
var router = express.Router();


/**
* Menu Links
*/
router.get('/', function(req, res, next) {

  res.render('admin', config);

});

/**
* View reaction definitions / votes currently stored in database
*/
router.get('/reactions', function(req, res, next) {

  var url = config.schemes[0] + '://' + config.host + '/api/reactions?limit=20000';

  request(url, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      res.render('admin-reactions', JSON.parse(body));

    }

  });

});

/**
* View top searches
*/
router.get('/searches', function(req, res, next) {

  var url = config.schemes[0] + '://' + config.host + '/api/searches?limit=500';

  request(url, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      res.render('admin-searches', JSON.parse(body));

    }

  });

});

module.exports = router;
