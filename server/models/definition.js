Definition = function() {

  this.definition;
  this.source;
  this.votes = new Votes();
  this.created_at;
  this.created_by;


  this.isValid = function() {
    var validFlag = true;

    if(typeof this.definition !== 'string' ||
       typeof this.source !== 'string' ||
       typeof this.votes !== 'object') {
      validFlag = false;
    }

    var listOfKeys = ['definition', 'source', 'votes', 'created_by',
                      'created_at', 'isValid', 'matches'];

    var length = Object.keys(this).length;
    for(var i=0; i<length; i++) {
      if(listOfKeys.indexOf(Object.keys(this)[i]) === -1) {
        validFlag = false;
      }
    }

    return validFlag;
  };


  this.matches = function(def) {
    return (def === this.definition) ? true : false;
  };

};
