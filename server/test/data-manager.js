var should = require('should');

var config = require('../config');

require('../models/data-manager.js');

describe('Data Manager', function() {
    var db_connection;
    var db_close;

    describe('Connection', function() {
      before(function(done) {
        dataManager(function(db) {
          db_connection = db;
          db_connection.connection.close(function (result) {
              db_close = result;
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


      it('validating that db close works properly', function() {
        should.equal(db_close, null);
      });




    });


});
