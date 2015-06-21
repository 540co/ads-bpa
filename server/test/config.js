var should = require('should');
var status = require('http-status');


// This details the Configuration Test Spec
describe('Configuration', function(){
  var config = require('../config')
  describe('MongoDB', function(){

    it('should not have a hostname that is null', function(){
      (config.mongo === null).should.not.be.true;
    });

  });

});
