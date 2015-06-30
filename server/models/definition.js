var helper = require('./models-helper');

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

    if(helper.checkIndices(this, listOfKeys) === false) {
      validFlag = false;
    }

    return validFlag;
  };


  this.matches = function(def) {
    return (def === this.definition) ? true : false;
  };

};
