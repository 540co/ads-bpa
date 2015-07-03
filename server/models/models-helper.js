checkIndices = function(obj, list) {
  var validFlag = true;

  var length = Object.keys(obj).length;
  for(var i=0; i<length; i++) {
    if(list.indexOf(Object.keys(obj)[i]) === -1) {
      validFlag = false;
    }
  }

  return validFlag;
}

module.exports = checkIndices;
