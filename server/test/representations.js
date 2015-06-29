require('../models/reactions.js');
require('../models/definition.js');
require('../models/votes.js');
require('../models/response.js');
require('../models/searches.js');
require('../models/data-manager.js');

var helper = require('./helper-representations.js');
var should = require('should');
var status = require('http-status');

// This details the Representation Test Spec
describe('Representations', function() {
  var definition;

  // This details the Definitions Representation
  describe('Definition', function() {
    beforeEach(function(done) {
        definition = helper.mockDefinition(
          "Test Definition for Death",
          "Merriam-Webster Medical Dictionary",
          "2015-06-20 11:14:55",
          "dre_app");
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



  // This details the Reaction Representation
  describe('Reaction', function() {
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

    it('should remove a definition from the list', function() {
      var definition = "This is another test Definition";
      reaction.addDefinition(helper.mockDefinition(
        definition,
        "Custom",
        "2015-06-20 14:56:12",
        "dre-harvester"
      ));

      var length = reaction.definitions.length;
      reaction.removeDefinition(definition);

      reaction.definitions.length.should.eql(length-1);
      reaction.definitionExists(definition).should.eql(false);
    });

    it('should return the most popular definition in the list', function() {
      var highestFlag = true;

      reaction.definitions = new Array();
      var definition1 = helper.mockDefinition("A", "A", "A", "A");
      var definition2 = helper.mockDefinition("B", "B", "B", "B");
      var votes1 = helper.mockVotes(1,1);
      var votes2 = helper.mockVotes(2,2);
      definition1.votes = votes1;
      definition2.votes = votes2;
      reaction.addDefinition(definition1);
      reaction.addDefinition(definition2);

      var popularDefinition = reaction.popularDefinition();

      var length = reaction.definitions.length;
      for(var i=0; i<length; i++) {
        if(popularDefinition.votes.ups < reaction.definitions[0].votes.ups) {
          highestFlag = false;
        }
      }

      highestFlag.should.eql(true);
      popularDefinition.definition.should.eql("B");
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

  // This details the Votes Representation
  describe('Votes', function() {
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

  // Response model
  describe('Response', function() {
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

  // Search Response model
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

  // Search Response model
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

  // Search Response model
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

    it('Ensure a valid search object is returned with count 1', function() {
      increment_result.should.be.an.instanceOf(Object);
      increment_result.should.have.property("search");
      increment_result.should.have.property("count");
      increment_result.count.should.be.exactly(1);
    });

    it('Ensure [testsearchterm] search term is deleted', function() {
      delete_result.should.be.an.instanceOf(Object);
      delete_result.should.have.property("ok");
    });

  });



});
