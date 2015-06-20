require('./helper-main.js');
require('../models/reactions.js');
require('../models/definition.js');
require('../models/votes.js');

var should = require('should');
var superagent = require('superagent');
var status = require('http-status');

// This details the Configuration Test Spec
describe('config', function(){
  var config = require('../config')
  describe('MongoDB', function(){

    it('should not have a hostname that is null', function(){
      (config.mongo === null).should.not.be.true;
    });

  });

});

// This details the Representation Test Spec
describe('Representations', function() {
  var definition;

  // This details the Definitions Representation
  describe('Definition', function() {
    beforeEach(function(done) {
        definition = mockDefinition(
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
        reaction = mockReaction();
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
      reaction.addDefinition(mockDefinition(
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
      reaction.addDefinition(mockDefinition(
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
      var definition1 = mockDefinition("A", "A", "A", "A");
      var definition2 = mockDefinition("B", "B", "B", "B");
      var votes1 = mockVotes(1,1);
      var votes2 = mockVotes(2,2);
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
      reaction.addDefinition(mockDefinition(
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
      votes = mockVotes(3,4);
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
});


// This details the Resources Test Spec
describe('resources', function() {
    // API resources
});







/****
 * HELPER FUNCTIONS
 *
 * Need to be moved into helper-main and resolve scoping issue
 ******/



function mockDefinition(def, source, created_at, created_by) {
  var definition = new Definition();

  definition.definition = def;
  definition.source = source;
  definition.created_at = created_at;
  definition.created_by = created_by;
  definition.votes = mockVotes(
    Math.floor(Math.random()*10),
    Math.floor(Math.random()*10));

  return definition;
}


// This function creates a mocked reactions instance for testing purposes
function mockReaction() {
  var reaction = new Reaction();

  reaction.reaction = "Death";
  reaction.definitions = new Array();
  reaction.definitions.pop(mockDefinition(
                    "Test Definition for Death",
                    "Merriam-Webster Medical Dictionary",
                    "2015-06-20 11:14:55",
                    "dre_app"));

  return reaction;
}


// This function creates a mocked votes instance for testing purposes with
// supplied numbers of yeses and noes to instantiate with
function mockVotes(yesVotes, noVotes) {
  var votes = new Votes();

  for(var i=0; i<yesVotes; i++) {
    votes.up();
  }

  for(i=0; i<noVotes; i++) {
    votes.down();
  }

  return votes;
}
