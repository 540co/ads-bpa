var config = require('../config');
var fs = require('fs');
var express = require('express');
var jade = require('jade');
var request = require('request');
var _ = require('lodash');
var moment = require('moment');
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
      var body = JSON.parse(body);

      var meta = body.meta;
      var reactions = body.data;

      _.forEach(reactions, function (reaction, reactionIndex) {

        if(reaction.last_updated) {
          reactions[reactionIndex].last_updated_english = moment(reaction.last_updated).fromNow();
        } else {
          reactions[reactionIndex].last_updated_english = "unknown / not set properly";
        }

        _.forEach(reaction.definitions, function (definition, definitionIndex) {

          if(definition.created_at) {
            reactions[reactionIndex].definitions[definitionIndex].created_at_english = moment(definition.created_at).fromNow();
          } else {
            reactions[reactionIndex].definitions[definitionIndex].created_at_english = "unknown / not set properly";
          }

        });

      });


      res.render('admin-reactions', {meta:meta, data: reactions});

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
