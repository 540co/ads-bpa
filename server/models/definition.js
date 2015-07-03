var checkIndices = require('./models-helper');
var Votes = require('./votes');
Definition = function() {

  this.definition;
  this.source;
  this.votes = new Votes();
  this.created_at;

  this.isValid = function() {
    var validFlag = true;

    if(typeof this.definition !== 'string' ||
       typeof this.source !== 'string' ||
       typeof this.votes !== 'object') {
      validFlag = false;
    }

    var listOfKeys = ['definition', 'source', 'votes',
                      'created_at', 'isValid', 'matches'];

    if(checkIndices(this, listOfKeys) === false) {
      validFlag = false;
    }

    return validFlag;
  };


  this.matches = function(def) {
    return (def === this.definition) ? true : false;
  };

};

module.exports = Definition;
