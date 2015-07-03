var config = require('../config').config;
var fs = require('fs');
var express = require('express');
var jade = require('jade');
var request = require('request');
var router = express.Router();

/**
* Return a machine readable json file defining the API using the
* apis.io json format (v0.14)
* REFERENCE: http://apisjson.org/
*/

router.get('/', function(req, res, next) {
  var apisjson = JSON.parse(fs.readFileSync('./routes/apisjson.json'));
  apisjson.url = config.schemes[0] + '://' + config.host + '/api';
  apisjson.apis[0].humanURL = config.schemes[0] + '://' + config.host + '/apidocs';
  apisjson.apis[0].baseURL = apisjson.apis[0].properties[0].url = config.schemes[0] + '://' + config.host + '/api';
  apisjson.apis[1].humanURL = config.schemes[0] + '://' + config.host + '/apidocs';
  apisjson.apis[1].baseURL = apisjson.apis[1].properties[0].url = config.schemes[0] + '://' + config.host + '/api';
  res.json(apisjson);
});

/**
* Return a swagger json definition (v2.0) of the DRE APIs
* REFERENCE: http://swagger.io/
*/
router.get('/swagger', function(req, res, next) {
  var swagger = JSON.parse(fs.readFileSync('./routes/swagger.json'));
  swagger.host = config.host;
  swagger.schemes = config.schemes;
  res.json(swagger);
});

module.exports = router;
