// ------------
// START NODE SERVER
// need to look at a cleaner way of using app.js without making
// a copy of the contents
// ------------
var config = require('../config');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('../routes/index');
var reactions = require('../routes/reactions');
var searches = require('../routes/searches');
var admin = require('../routes/admin');

var fs = require('fs');
var jade = require('jade');

var async = require('async');

var app = express();

db = {};

require('../models/data-manager.js');

// Starting services / connections that must be done prior
// to start of Node
async.series([
    function(callback){
      console.log('Connecting to MongoDB...');
      dataManager(function(result) {
        db = result;
        callback();
      });
    }
],

// Start node listening for incoming requests
function(err, results){

  console.log('Starting Drug Reactions Explained [DRE] Server...')
  // view engine setup
  app.set('views', path.join(__dirname, '../views'));
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

// ------------
// ROUTE TESTS
// need to look at a cleaner way of using app.js without making
// a copy of the contents
// ------------

var should = require('should');
var request = require('supertest');
var async = require('async');

var baseUrl = '/api';

describe('API Routes', function(){

  describe('GET /reactions (list) - no limit or offset', function(){

    it('respond with HTTP STATUS CODE 200', function(done){
      request(app)
        .get(baseUrl + '/reactions')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('GET /reactions (list) - offset = -1', function(){

    it('respond with HTTP STATUS CODE 200', function(done){
      request(app)
        .get(baseUrl + '/reactions?offset=-1')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('GET /reactions (list) - limit = 1', function(){

    it('respond with HTTP STATUS CODE 200', function(done){
      request(app)
        .get(baseUrl + '/reactions?limit=1')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('GET /reactions (list) - limit = -1', function(){

    it('respond with HTTP STATUS CODE 200', function(done){
      request(app)
        .get(baseUrl + '/reactions?limit=-1')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('GET /reactions (list) - limit > 200', function(){

    it('respond with HTTP STATUS CODE 200', function(done){
      request(app)
        .get(baseUrl + '/reactions?limit=1000')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('POST /reactions (instance = bogus) - Invalid content-type', function(){

    it('respond with HTTP STATUS CODE 400', function(done){
      request(app)
        .post(baseUrl + '/reactions')
        .set('Content-type', 'BAD-CONTENT-TYPE')
        .send('{"reaction":"bogus"}')
        .expect(400)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('POST /reactions (reaction = bogus) - Positive test', function(){

    it('respond with HTTP STATUS CODE 200', function(done){
      request(app)
        .post(baseUrl + '/reactions')
        .set('Content-type', 'application/json')
        .send('{"reaction":"bogus"}')
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('POST /reactions (reaction = bogus) - Duplicate (should be rejected)', function(){

    it('respond with HTTP STATUS CODE 422', function(done){
      request(app)
        .post(baseUrl + '/reactions')
        .set('Content-type', 'application/json')
        .send('{"reaction":"bogus"}')
        .expect(422)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('POST /reactions /definition (reaction = bogus | definition = foobar) - Bad content-type', function(){

    it('respond with HTTP STATUS CODE 400', function(done){
      request(app)
        .post(baseUrl + '/reactions/bogus/definitions')
        .set('Content-type', 'BAD-CONTENT-TYPE')
        .send('{"definition":"foobar"}')
        .expect(400)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('POST /reactions /definition (reaction = bogus | definition = foobar) - Bad request body', function(){

    it('respond with HTTP STATUS CODE 400', function(done){
      request(app)
        .post(baseUrl + '/reactions/bogus/definitions')
        .set('Content-type', 'application/json')
        .send('{"xxxdefinitionxxx":"foobar"}')
        .expect(400)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('POST /reactions /definition (reaction = bogus | definition = foobar) - Should be ok', function(){

    it('respond with HTTP STATUS CODE 200', function(done){
      request(app)
        .post(baseUrl + '/reactions/bogus/definitions')
        .set('Content-type', 'application/json')
        .send('{"definition":"foobar"}')
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('PUT /reactions /definition (reaction = bogus | definitionIndex = 0) - Bad content-type', function(){

    it('respond with HTTP STATUS CODE 400', function(done){
      request(app)
        .put(baseUrl + '/reactions/bogus/definitions/0')
        .set('Content-type', 'BAD-CONTENT-TYPE')
        .send('{"vote":"up"}')
        .expect(400)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('PUT /reactions /definition (reaction = bogus | definitionIndex = 0) - Bad request body (vote property not set)', function(){

    it('respond with HTTP STATUS CODE 400', function(done){
      request(app)
        .put(baseUrl + '/reactions/bogus/definitions/0')
        .set('Content-type', 'application/json')
        .send('{"xxxvotexxx":"up"}')
        .expect(400)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('PUT /reactions /definition (reaction = bogus | definitionIndex = 0) - Bad request body (vote value not valid)', function(){

    it('respond with HTTP STATUS CODE 400', function(done){
      request(app)
        .put(baseUrl + '/reactions/bogus/definitions/0')
        .set('Content-type', 'application/json')
        .send('{"vote":"xxxupxxx"}')
        .expect(400)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('PUT /reactions /definition (reaction = bogus | definitionIndex = 0) - Vote up - should be ok', function(){

    it('respond with HTTP STATUS CODE 200', function(done){
      request(app)
        .put(baseUrl + '/reactions/bogus/definitions/0')
        .set('Content-type', 'application/json')
        .send('{"vote":"up"}')
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('PUT /reactions /definition (reaction = bogus | definitionIndex = 0) - Vote down - should be ok', function(){

    it('respond with HTTP STATUS CODE 200', function(done){
      request(app)
        .put(baseUrl + '/reactions/bogus/definitions/0')
        .set('Content-type', 'application/json')
        .send('{"vote":"down"}')
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('PUT /reactions /definition (reaction = xxxfoobarxxx | definitionIndex = 0) - Reaction cannot be found', function(){

    it('respond with HTTP STATUS CODE 404', function(done){
      request(app)
        .put(baseUrl + '/reactions/xxxfoobarxxx/definitions/0')
        .set('Content-type', 'application/json')
        .send('{"vote":"down"}')
        .expect(404)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('PUT /reactions /definition (reaction = bogus | definitionIndex = 1000) - Vote down - not a valid definition index', function(){

    it('respond with HTTP STATUS CODE 404', function(done){
      request(app)
        .put(baseUrl + '/reactions/bogus/definitions/1000')
        .set('Content-type', 'application/json')
        .send('{"vote":"down"}')
        .expect(404)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('POST /reactions /definition (reaction = bogus | definition = foobar) - Duplicate definition (should be rejected)', function(){

    it('respond with HTTP STATUS CODE 422', function(done){
      request(app)
        .post(baseUrl + '/reactions/bogus/definitions')
        .set('Content-type', 'application/json')
        .send('{"definition":"foobar"}')
        .expect(422)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('POST /reactions /definition (reaction = foobarfoobar | definition = foobar) - Reaction not found / does not exist', function(){

    it('respond with HTTP STATUS CODE 404', function(done){
      request(app)
        .post(baseUrl + '/reactions/foobarfoobar/definitions')
        .set('Content-type', 'application/json')
        .send('{"definition":"foobar"}')
        .expect(404)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('GET /reactions (reaction = bogus) - Postive Test', function(){

    it('respond with HTTP STATUS CODE 200', function(done){
      request(app)
        .get(baseUrl + '/reactions/bogus')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('GET /reactions (reaction = foo) - Does not exist', function(){

    it('respond with HTTP STATUS CODE 404', function(done){
      request(app)
        .get(baseUrl + '/reactions/foo')
        .set('Accept', 'application/json')
        .expect(404)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('DELETE /reactions (reaction = bogus) - Postive Test', function(){

    it('respond with HTTP STATUS CODE 204', function(done){
      request(app)
        .delete(baseUrl + '/reactions/bogus')
        .set('Content-type', 'application/json')
        .expect(204)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('DELETE /reactions (reaction = foo) - Reaction not found', function(){

    it('respond with HTTP STATUS CODE 404', function(done){
      request(app)
        .delete(baseUrl + '/reactions/foo')
        .set('Content-type', 'application/json')
        .expect(404)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('GET /searches (list)', function(){

    it('respond with HTTP STATUS CODE 200', function(done){
      request(app)
        .get(baseUrl + '/searches')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('GET /searches (list) - limit < 1', function(){

    it('respond with HTTP STATUS CODE 200', function(done){
      request(app)
        .get(baseUrl + '/searches?limit=-999')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('GET /searches (list) - limit > 200', function(){

    it('respond with HTTP STATUS CODE 200', function(done){
      request(app)
        .get(baseUrl + '/searches?limit=999')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('GET /searches (list) - offset = 1', function(){

    it('respond with HTTP STATUS CODE 200', function(done){
      request(app)
        .get(baseUrl + '/searches?offset=1')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('POST /searches (searchterm = vyvanse)', function(){

    it('respond with HTTP STATUS CODE 200', function(done){
      request(app)
        .post(baseUrl + '/searches')
        .set('Content-type', 'application/json')
        .expect(200)
        .send('{"search":"vyvanse"}')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('POST /searches - Bad content-type', function(){

    it('respond with HTTP STATUS CODE 400', function(done){
      request(app)
        .post(baseUrl + '/searches')
        .set('Content-type', 'BAD-CONTENT-TYPE')
        .expect(400)
        .send('{"search":"vyvanse"}')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

  describe('POST /searches - Bad request body', function(){

    it('respond with HTTP STATUS CODE 400', function(done){
      request(app)
        .post(baseUrl + '/searches')
        .set('Content-type', 'application/json')
        .expect(400)
        .send('{"xxxsearchxxx":"vyvanse"}')
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })

  });

});




var adminUrl = '/admin';

describe('ADMIN Routes', function(){

  describe('GET /admin', function(){
    it('respond with HTTP STATUS CODE 200', function(done){
      request(app)
        .get(adminUrl)
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

  describe('GET /admin/reactions', function(){
    it('respond with HTTP STATUS CODE 200', function(done){
      request(app)
        .get(adminUrl + '/reactions')
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

  describe('GET /admin/searches', function(){
    it('respond with HTTP STATUS CODE 200', function(done){
      request(app)
        .get(adminUrl + '/searches')
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          done()
        });
    })
  });

});
