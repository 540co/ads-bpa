var assert = require('assert');
var superagent = require('superagent');
var status = require('http-status');

describe('config', function(){
  var config = require('../config')
  describe('#mongo', function(){

    it('mongo hostname must not be null', function(){
      assert.notEqual(config.mongo,null);
    })

  })

})
