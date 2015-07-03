var should = require('should');
var config = require('../config').config;
var dataManager = require('../models/data-manager').dataManager;

describe('Data Manager', function() {
  var db_connection;
  var db_collection_err;
  var db_collection_result;
  var db_close;

  describe('Connection | Collection | Close', function() {
    before(function(done) {
      dataManager(function(db) {
        db_connection = db;

        db_connection.ensureCollectionExists('test', function (err, result) {
          db_collection_err = err;
          db_collection_result = result;
          done();
        });
      });
    });

    it('ensure valid mongo connection object created when dataManager is started', function() {
      db_connection.should.be.an.instanceOf(Object);
      db_connection.should.have.property("connection");
      db_connection.connection.s.databaseName.should.eql(config.db);
    });

    it('ensure connection to database established when dataManager is started matches config', function() {
      db_connection.should.be.an.instanceOf(Object);
      db_connection.connection.s.databaseName.should.eql(config.db);
    });

    it('validating that ensureCollectionExists checks that a collection exists and/or creates', function() {
      should.equal(db_collection_err, null);
    });

    it('validating that db close works properly', function() {
      db_connection.close(function (result) {
          db_close = result;
          done();
      });
      should.equal(db_close, null);
    });

  });
});
