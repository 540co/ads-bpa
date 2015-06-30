var should = require('should');

var config = require('../config');

require('../models/service-manager.js');


describe('Service Manager', function() {


    describe('Overall', function() {
      it('Ensure there is a service object', function() {
        serviceManager.should.be.an.instanceOf(Object);
      });
    });


    describe('Wordnik API - Example 1: Aggression (Positive Test)', function() {
      var definitions;

      before(function(done) {
        serviceManager.getDefinitionsFromWordnikApi('Aggression', config.wordnikapi_key, function(result) {
          definitions = result;
          done();
        });
      });

      it('Ensure there a function available to query Wordnik API', function() {
        serviceManager.getDefinitionsFromWordnikApi.should.be.an.instanceOf(Function);
      });

      it('Ensure dictionary lookup results in an array response', function() {
        definitions.should.be.an.instanceOf(Array);
      });

      it('Ensure array count is greather than zero', function() {
        definitions.length.should.be.greaterThan(0);
      });


    });

    describe('Wordnik API - Example 2: Aggression (Negative Test - Bad API Key)', function() {
      var definitions;

      before(function(done) {
        serviceManager.getDefinitionsFromWordnikApi('Aggression','xxx', function(result) {
          definitions = result;
          done();
        });
      });

      it('Ensure there a function available to query Wordnik API', function() {
        serviceManager.getDefinitionsFromWordnikApi.should.be.an.instanceOf(Function);
      });

      it('Ensure dictionary lookup results in an array response', function() {
        definitions.should.be.an.instanceOf(Array);
      });

      it('Ensure array count is equal to than zero', function() {
        definitions.length.should.be.equal(0);
      });

    });

    describe('Dictionary API - Example 1: Aggression (Positive Test)', function() {
      var definitions;

      before(function(done) {
        serviceManager.getDefinitionsFromDictionaryApi('Aggression', config.dictionaryapi_key, function(result) {
          definitions = result;
          done();
        });
      });


      it('Ensure there a function available to query Dictionary API', function() {
        serviceManager.getDefinitionsFromDictionaryApi.should.be.an.instanceOf(Function);
      });

      it('Ensure dictionary lookup results in an array response', function() {
        definitions.should.be.an.instanceOf(Array);
      });

      it('Ensure array count is greather than zero', function() {
        definitions.length.should.be.greaterThan(0);
      });


    });

    describe('Dictionary API - Example 2: Aggression (Negative Test - Bad API Key)', function() {
      var definitions;

      before(function(done) {
        serviceManager.getDefinitionsFromDictionaryApi('Aggression', 'xxx', function(result) {
          definitions = result;
          done();
        });
      });


      it('Ensure there a function available to query Dictionary API', function() {
        serviceManager.getDefinitionsFromDictionaryApi.should.be.an.instanceOf(Function);
      });

      it('Ensure dictionary lookup results in an array response', function() {
        definitions.should.be.an.instanceOf(Array);
      });

      it('Ensure array count is equal to than zero', function() {
        definitions.length.should.be.equal(0);
      });


    });

    describe('Dictionary API - Example 2: LiVeR (Positive Test)', function() {
      var definitions;

      before(function(done) {
        serviceManager.getDefinitionsFromDictionaryApi('LiVeR', config.dictionaryapi_key, function(result) {
          definitions = result;
          done();
        });
      });


      it('Ensure there a function available to query Dictionary API', function() {
        serviceManager.getDefinitionsFromDictionaryApi.should.be.an.instanceOf(Function);
      });

      it('Ensure dictionary lookup results in an array response', function() {
        definitions.should.be.an.instanceOf(Array);
      });

      it('Ensure array count is greather than zero', function() {
        definitions.length.should.be.greaterThan(0);
      });

    });

    describe('Dictionary API - Example 3: NOSE (Positive Test)', function() {
      var definitions;

      before(function(done) {
        serviceManager.getDefinitionsFromDictionaryApi('NOSE', config.dictionaryapi_key, function(result) {
          definitions = result;
          done();
        });
      });


      it('Ensure there a function available to query Dictionary API', function() {
        serviceManager.getDefinitionsFromDictionaryApi.should.be.an.instanceOf(Function);
      });

      it('Ensure dictionary lookup results in an array response', function() {
        definitions.should.be.an.instanceOf(Array);
      });

      it('Ensure array count is greather than zero', function() {
        definitions.length.should.be.greaterThan(0);
      });

    });


});
