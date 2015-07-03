var Reaction = require('../models/reactions.js');
var Definition = require('../models/definition.js');
var Votes = require('../models/votes.js');
var Response = require('../models/response.js');
var Searches = require('../models/searches.js');
var dataManager = require('../models/data-manager.js');

var helper = require('./helper-representations.js');
var should = require('should');
var status = require('http-status');

var config = require('../config');


describe('Reactions and supporting objects', function() {
  var definition;

  describe('Definition (Model)', function() {
    beforeEach(function(done) {
        definition = helper.mockDefinition(
          "Test Definition for Death",
          "Merriam-Webster Medical Dictionary",
          "2015-06-20 11:14:55");
        done();
    });

    it('should verify the structure of an instance', function() {
      definition.should.be.an.instanceOf(Object);
      definition.should.have.property("definition");
      definition.should.have.property("source");
      definition.isValid().should.eql(true);

      definition.definition = null;
      definition.isValid().should.eql(false);

      definition.definition = "Validness";
      definition.source = new Array();
      definition.isValid().should.eql(false);

      definition.source = "The Source";
      definition.votes = 123;
      definition.isValid().should.eql(false);

      definition.votes = new Votes();
      definition.isValid().should.eql(true);

      definition.extraAttribute = "ASDF";
      definition.isValid().should.eql(false);
    });

    it('should check if a supplied definition is a match', function() {
      definition.matches(definition.definition).should.eql(true);
    });

    it('should vote up for an identified definition in the list', function() {
      var count = definition.votes.ups;
      definition.votes.up();
      definition.votes.ups.should.eql(count+1);
    });

    it('should vote down for an identified definition in the list', function() {
      var count = definition.votes.downs;
      definition.votes.down();
      definition.votes.downs.should.eql(count+1);
    });

  });

  describe('Votes (Model)', function() {
    var votes;
    beforeEach(function(done) {
      votes = helper.mockVotes(3,4);
      done();
    });

    it('should verify the structure of an instance', function() {
      votes.should.be.an.instanceOf(Object);
      votes.should.have.property("ups");
      votes.should.have.property("downs");
      votes.isValid().should.eql(true);

      votes.ups = null;
      votes.isValid().should.eql(false);

      votes.ups = 2;
      votes.downs = new Array();
      votes.isValid().should.eql(false);

      votes.downs = 4;
      votes.isValid().should.eql(true);

      votes.extraAttribute = 123;
      votes.isValid().should.eql(false);
    });

    it('should allow an up vote to increase up vote total by 1', function() {
      var count = votes.ups;
      votes.up();
      votes.ups.should.eql(count+1);
    });

    it('should allow a down vote to increase down vote total by 1', function() {
      var count = votes.downs;
      votes.down();
      votes.downs.should.eql(count+1);
    });
  });

  describe('Reaction (Model)', function() {
    var reaction;

    beforeEach(function(done) {
        reaction = helper.mockReaction();
        done();
    });

    it('should verify the structure of an instance', function() {
      reaction.should.be.an.instanceOf(Object);
      reaction.should.have.property("reaction");
      reaction.should.have.property("definitions");
      reaction.isValid().should.eql(true);

      reaction.reaction = null;
      reaction.isValid().should.eql(false);

      reaction.reaction = "Validness";
      reaction.definitions = 123;
      reaction.isValid().should.eql(false);

      reaction.definitions = new Array();
      reaction.isValid().should.eql(true);

      reaction.extraAttribute = "ASDF";
      reaction.isValid().should.eql(false);

    });

    it('should add a definition to the list', function() {
      var length = reaction.definitions.length;
      var definition = "This is another test Definition";

      reaction.addDefinition(helper.mockDefinition(
        definition,
        "Custom",
        "2015-06-20 14:56:12",
        "dre-harvester"
      ));

      reaction.definitions.length.should.eql(length+1);
      reaction.definitionExists(definition).should.eql(true);
    });

    it('should check the existance of a supplied definition in the list', function() {
      var definition = "This is another test Definition";
      reaction.addDefinition(helper.mockDefinition(
        definition,
        "Custom",
        "2015-06-20 14:56:12",
        "dre-harvester"
      ));
      reaction.definitionExists(definition).should.eql(true);
    });


  });

  describe('Reaction (getList)', function() {
    var db;
    var list;

    beforeEach(function(done) {
      dataManager(function(db_connection) {
        db = db_connection;

        Reaction.getList(db.connection,0,0,function (res) {
          list = res;
          done();
        });

      });
    });

    it('verify that an array of results is returned', function() {
      list.should.be.an.instanceOf(Array);
    });

  });

  describe('Reaction (getCount)', function() {
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

  describe('Reaction (find reaction that exists)', function() {

    var response;

    before(function(done) {

      dataManager(function(db_connection) {
        db = db_connection;

        reaction = new Reaction("pneumonia");

        reaction.find(db.connection, function (res) {
          response = res;
          done();
        });

      });

    });

    it('valid reaction object', function() {
      reaction.should.have.property("reaction");
      reaction.should.have.property("definitions");
    });

  });

  describe('Reaction (find reaction that DOES NOT exist)', function() {

    var response;

    before(function(done) {

      dataManager(function(db_connection) {
        db = db_connection;

        reaction = new Reaction("xxx");

        reaction.find(db.connection, function (res) {
          response = res;
          done();
        });

      });

    });

    it('reaction should be null', function() {
        should.equal(response, null);
    });

  });

  describe('Reaction (upsert)', function() {

    var response;

    before(function(done) {

      dataManager(function(db_connection) {
        db = db_connection;

        reaction = new Reaction("test");

        reaction.upsert(db.connection, function (res) {
          response = res;
          done();
        });

      });

    });

    it('response should be object with {n, nModified, ok} properties', function() {

    });

  });

  describe('Reaction (remove)', function() {
      var response = null;

      before(function(done) {
        dataManager(function(db_connection) {
          db = db_connection;

          reaction = new Reaction("test");

          reaction.remove(db.connection, function (res) {
            response = res;
            done();
          });

        });
      });

      it('response should be object with {n, ok} properties', function() {
        response.should.have.property("n");
        response.should.have.property("ok");
      });

  });

  describe('Response (Model)', function() {
    var response;
    beforeEach(function(done) {
      response = helper.mockResponse();
      done();
    });

    it('should verify the structure of an instance', function() {
      response.should.be.an.instanceOf(Object);
      response.should.have.property("meta");
      response.should.have.property("data");
    });

    it('should verfify an execution time was calculated', function() {
      response.meta.should.have.property('execution_time');
    });

  });

});
