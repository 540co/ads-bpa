Reaction = function() {

  var reaction;
  var definitions = new Array();
  var created_at;
  var created_by;

  this.isValid = function() {
    var validFlag = true;

    if(typeof this.reaction != 'string' ||
       typeof this.definitions != 'object') {
      validFlag = false;
    }

    var listOfKeys = ['reaction', 'definitions', 'created_at', 'created_by',
                      'isValid', 'addDefinition', 'removeDefinition',
                      'popularDefinition', 'definitionExists'];

    var length = Object.keys(this).length;
    for(var i=0; i<length; i++) {
      if(listOfKeys.indexOf(Object.keys(this)[i]) == -1) {
        validFlag = false;
      }
    }

    return validFlag;
  }

  this.addDefinition = function(definition) {
    this.definitions.push(definition);
    return true;
  }

  this.removeDefinition = function(definition) {
    var length = this.definitions.length;
    var matchingIndex = null;

    for(var i=0; i<length; i++) {
      if(this.definitions[i].matches(definition)) {
        matchingIndex = i;
      }
    }
    if(matchingIndex != null) {
      this.definitions.splice(matchingIndex, 1);
    }

    return (matchingIndex != null) ? true : false
  }

  this.popularDefinition = function() {
    var length = this.definitions.length;

    var currentHigh = 0;
    var currentIndex;
    for(var i=0; i<length; i++) {
      if(currentIndex == null) {
        currentIndex = i;
      }
      if(this.definitions[i].votes.ups > currentHigh) {
        currentHigh = this.definitions[i].votes.ups;
        currentIndex = i;
      }
    }

    return (currentIndex == null) ? null : this.definitions[currentIndex];
  }

  this.definitionExists = function(definition) {
    var existsFlag = false;

    var length = this.definitions.length;
    for(var i=0; i<length; i++) {
      if(this.definitions[i].matches(definition)) {
        existsFlag = true;
      }
    }

    return existsFlag;
  }
};
