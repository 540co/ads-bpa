var Definition = require('../models/definition').Definition;
var Reaction = require('../models/reactions').Reaction;
var Votes = require('../models/votes').Votes;
var Response = require('../models/response').Response;

//This function creates a mocked definition instance for testing purposes
var mockDefinition = function(def, source, created_at, created_by) {
  var definition = new Definition();

  definition.definition = def;
  definition.source = source;
  definition.created_at = created_at;
  definition.votes = mockVotes(
    Math.floor(Math.random()*10),
    Math.floor(Math.random()*10));

  return definition;
};


// This function creates a mocked reactions instance for testing purposes
var mockReaction = function() {
  var reaction = new Reaction("Death");

  reaction.definitions = new Array();
  reaction.definitions.pop(mockDefinition(
                    "Test Definition for Death",
                    "Merriam-Webster Medical Dictionary",
                    "2015-06-20 11:14:55",
                    "dre_app"));

  return reaction;
};

// This function creates a mocked votes instance for testing purposes with
// supplied numbers of yeses and noes to instantiate with
var mockVotes = function(yesVotes, noVotes) {
  var votes = new Votes();

  for(var i=0; i<yesVotes; i++) {
    votes.up();
  }

  for(i=0; i<noVotes; i++) {
    votes.down();
  }

  return votes;
};

// This function creates a mock response for testing purposes
var mockResponse = function() {
  var response = new Response();
  response.calculateExecutionTime();
  return response;
}

//Exports to make functions available in main.js
module.exports.mockDefinition = mockDefinition;
module.exports.mockReaction = mockReaction;
module.exports.mockVotes = mockVotes;
module.exports.mockResponse = mockResponse;
