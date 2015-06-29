var config = require('./config');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var reactions = require('./routes/reactions');
var searches = require('./routes/searches');
var admin = require('./routes/admin');

var async = require('async');

var app = express();

db = {};

require('./models/data-manager.js');

async.series([
    function(callback){
      console.log('Connecting to MongoDB...');
      dataManager(function(result) {
        db = result;
        callback();
      });
    }
],
// optional callback
function(err, results){

  console.log('Starting Node / Express...')
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  // uncomment after placing your favicon in /public
  //app.use(favicon(__dirname + '/public/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use('/api', index);
  app.use('/api/reactions', reactions);
  app.use('/api/searches', searches);

  app.use('/admin', admin);

  app.use('/', express.static(__dirname + '/../client/dist'));
  app.use('/public', express.static(__dirname + '/public'));
  app.use('/apidocs', express.static(__dirname + '/swagger'));


  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.json({error: err.error, message: err.message, request_body: req.body});
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({error: err.error, message: err.message});
  });

});

module.exports = app;
