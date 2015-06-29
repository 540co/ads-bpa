var should = require('should');

var config = require('../config');

require('../models/service-manager.js');


describe('Service Manager', function() {


    describe('Overall', function() {
      it('Ensure there a service object', function() {
        serviceManager.should.be.an.instanceOf(Object);
      });
    });


    describe('Wordnik API', function() {
      var definitions;

      before(function(done) {
        serviceManager.getDefinitionsFromWordnikApi('test', config.wordnikapi_key, function(result) {
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


    });

    describe('Dictionary API', function() {
      var definitions;

      before(function(done) {
        serviceManager.getDefinitionsFromDictionaryApi('insomnia', config.dictionaryapi_key, function(result) {
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


    });


});
