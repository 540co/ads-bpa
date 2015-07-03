var checkIndices = require('./models-helper').checkIndices;
var Votes = function() {

  this.ups = 0;
  this.downs = 0;

  this.isValid = function() {
    var validFlag = true;

    if(typeof this.ups !== 'number' ||
       typeof this.downs !== 'number') {
      validFlag = false;
    }

    var listOfKeys = ['ups', 'downs', 'isValid', 'up', 'down'];

    if(checkIndices(this, listOfKeys) === false) {
      validFlag = false;
    }

    return validFlag;
  };

  this.up = function() {
    this.ups++;
  };

  this.down = function() {
    this.downs++;
  };

};

module.exports.Votes = Votes;
