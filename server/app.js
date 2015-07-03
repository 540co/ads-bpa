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

var dataManager = require('./models/data-manager');

// Starting services / connections that must be done prior
// to start of Node
console.log('---');
console.log('# Starting Drug Reactions Explained [DRE] #')

async.series([
    function(connect_callback){
      console.log('---');
      console.log('Connecting to MongoDB ['+ config.mongo + config.db + ']');
      dataManager(function(result) {
        db = result;
        connect_callback();
      });
    },
    function(collection_callback){
      console.log('---');
      console.log('Confirm MongoDB collection [' + config.reactions_collection + '] exists');
      db.ensureCollectionExists(config.reactions_collection, function (err, collection) {
        if (err) {
          console.log(err);
          console.log('WARNING: validating / creating collection - but continuing');
        } else {
          collection_callback();
        }
      });
    },
    function(collection_callback){
      console.log('---');
      console.log('Confirm MongoDB collection [' + config.searches_collection + '] exists');
      db.ensureCollectionExists(config.searches_collection, function (err, collection) {
        if (err) {
          console.log(err);
          console.log('WARNING: validating / creating collection - but continuing');
        } else {
          collection_callback();
        }
      });
    }
],

// Start node listening for incoming requests
function(err, results){
  console.log('---');
  console.log('Starting app server listen');
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

  console.log('---');

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
