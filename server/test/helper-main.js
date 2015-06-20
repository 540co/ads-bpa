/*
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
    //votes.down();
  }

  return votes;
}
*/
