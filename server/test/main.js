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
  var reaction;

  // This details the Definitions Representation
  describe('Definition', function() {
    beforeEach(function(done) {
        var definition = new Definition();
        done();
    });

    it('should verify the structure of an instance', function() {
      definition.should.be.an.instanceOf(Object).and.have.property(
        'definition',
        'source');
      definition.isValid().should.eql(true);
      definition.definition = null;
      definition.isValid().should.eql(false);
    });

    it('should check if a supplied definition is a match', function() {
      definition.matches(definition.defintion).should.eql(true);
    });

    it('should vote up for an identified definition in the list', function() {
      var count = definition.votes.ups;
      definition.votes.up();
      definition.votes.ups.should.eql(count+1);
    });

    it('should vote down for an identified definition in the list', function() {
      definition.votes.up();
      var count = definition.votes.downs;
      definition.votes.down();
      definition.votes.downs.should.eql(count-1);
    });

  });



  // This details the Reaction Representation
  describe('Reaction', function() {
    beforeEach(function(done) {
        reaction = new Reaction();
        done();
    });

    it('should verify the structure of an instance', function() {
      reaction.should.be.an.instanceOf(Object).and.have.property(
        'reaction',
        'definitions');
      reaction.isValid().should.eql(true);
      reaction.reaction = null;
      reaction.isValid().should.eql(false);
    });

    it('should add a definition to the list', function() {
      var length = reaction.definitions.length;
      var definition = "This is another test Definition";

      reaction.definitions.add(mockDefinition(
        definition,
        "Custom",
        "2015-06-20 14:56:12",
        "dre-harvester"
      ));

      length.should.eql(reaction.definitions.length-1);
      reaction.definitions.exists(defintion).should.eql(true);
    });

    it('should remove a definition from the list', function() {
      var definition = "This is another test Definition";
      reaction.definitions.add(mockDefinition(
        definition,
        "Custom",
        "2015-06-20 14:56:12",
        "dre-harvester"
      ));

      var length = reaction.definitions.length;
      reaction.definitions.remove(definition);

      length.should.eql(reaction.definitions.length+1);
      reaction.definitions.exists(defintion).should.eql(false);
    });

    it('should return the most popular definition in the list', function() {
      var highestFlag = true;
      var popularDefinition = reaction.definitions.popular();

      var length = reaction.definitions.length;
      for(var i=0; i<length; i++) {
        if(popularDefinition.votes.up < reaction.definitions[0].votes.up) {
          highestFlag = false;
        }
      }

      highestFlag.should.eql(true);
    });

    it('should check the existance of a supplied definition in the list', function() {
      var definition = "This is another test Definition";
      reaction.definitions.add(mockDefinition(
        definition,
        "Custom",
        "2015-06-20 14:56:12",
        "dre-harvester"
      ));

      reaction.definitions.exists(definition).should.eql(true);
    });

  });




  // This details the Votes Representation
  describe('Votes', function() {
    beforeEach(function(done) {
      var votes = new Votes();
      done();
    });

    it('should verify the structure of an instance', function() {
      votes.should.be.an.instanceOf(Object).and.have.property(
        'ups',
        'downs');
      votes.isValid().should.eql(true);
      votes.downs = null;
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
