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


describe('Response', function() {
  var definition;

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
