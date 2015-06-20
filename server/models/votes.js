Votes = function() {

  this.ups = 0;
  this.downs = 0;

  this.isValid = function() {
    var validFlag = true;

    if(typeof this.ups != 'number' ||
       typeof this.downs != 'number') {
      validFlag = false;
    }

    var listOfKeys = ['ups', 'downs', 'isValid', 'up', 'down'];

    var length = Object.keys(this).length;
    for(var i=0; i<length; i++) {
      if(listOfKeys.indexOf(Object.keys(this)[i]) == -1) {
        validFlag = false;
      }
    }

    return validFlag;
  }

  this.up = function() {
    this.ups++;
  }

  this.down = function() {
    this.downs++;
  }

}
