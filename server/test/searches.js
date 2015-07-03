require('../models/reactions.js');
require('../models/definition.js');
require('../models/votes.js');
require('../models/response.js');
require('../models/searches.js');
require('../models/data-manager.js');

var helper = require('./helper-representations.js');
var should = require('should');
var status = require('http-status');

var config = require('../config');

describe('Searches', function() {

  describe('Searches (getCount)', function() {
    var db;
    var count;

    beforeEach(function(done) {
      dataManager(function(db_connection) {
        db = db_connection;

        Searches.getCount(db.connection,function (res) {
          count = res;
          done();
        });

      });
    });

    it('verify count is a number', function() {
        count.should.be.a.Number();
    });

    it('verify count is greater than -1', function() {
        count.should.be.greaterThan(-1);
    });

  });

  describe('Searches (getList)', function() {
    var db;
    var list;

    beforeEach(function(done) {
      dataManager(function(db_connection) {
        db = db_connection;

        Searches.getList(db.connection,0,0,function (res) {
          list = res;
          done();
        });

      });
    });

    it('verify that an array of results is returned', function() {
      list.should.be.an.instanceOf(Array);
    });

  });

  describe('Searches (incrementCount)', function() {

    var db;
    var search;
    var increment_result;
    var delete_result;

    before(function(done) {
      dataManager(function(db_connection) {
        db = db_connection;

        search = new Searches('testsearchterm');

        search.incrementCount(db.connection,function (res) {
          increment_result = res;

            search.remove(db.connection,function (delres) {
              delete_result = delres;
              done();
            });

        });
      });
    });

    it('Ensure a valid search object is returned with count 0', function() {
      increment_result.should.be.an.instanceOf(Object);
      increment_result.should.have.property("search");
      increment_result.should.have.property("count");
      increment_result.count.should.be.exactly(0);
    });

    it('Ensure [testsearchterm] search term is deleted', function() {
      delete_result.should.be.an.instanceOf(Object);
      delete_result.should.have.property("ok");
    });

  });

});
