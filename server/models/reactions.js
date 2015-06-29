var helper = require('./models-helper');
var async = require('async');
var _ = require('lodash');

Reaction = function(reactionterm) {

  this.reaction = reactionterm.toLowerCase();
  this.definitions = [];
  this.created_at;
  this.created_by;

  this.isValid = function() {
    var validFlag = true;

    if(typeof this.reaction !== 'string' ||
       typeof this.definitions !== 'object') {
      validFlag = false;
    }

    var listOfKeys = ['reaction', 'definitions', 'created_at', 'created_by',
                      'find', 'isValid', 'addDefinition', 'removeDefinition',
                      'popularDefinition', 'definitionExists'];

    if(helper.checkIndices(this, listOfKeys) === false) {
      validFlag = false;
    }

    return validFlag;
  };


  this.find = function (db_connection, callback) {
    var collection = db_connection.collection('reactions');
    reaction = this;

    collection.findOne({'reaction': this.reaction}, function(err, res) {
      if (err || !res) {
        callback(null);
      }

      if (res) {
        reaction.definitions = res.definitions;
        reaction.created_at = res.created_at;
        reaction.created_by = res.created_by;
        callback(reaction);
      }

    });

  };

  this.addDefinition = function(definition) {
    this.definitions.push(definition);
    return true;
  };

  this.removeDefinition = function(definition) {
    var length = this.definitions.length;
    var matchingIndex = null;

    for(var i=0; i<length; i++) {
      if(this.definitions[i].matches(definition)) {
        matchingIndex = i;
      }
    }
    if(matchingIndex !== null) {
      this.definitions.splice(matchingIndex, 1);
    }

    return (matchingIndex !== null) ? true : false
  };

  this.popularDefinition = function() {
    var length = this.definitions.length;

    var currentHigh = 0;
    var currentIndex;
    for(var i=0; i<length; i++) {
      if(currentIndex === null) {
        currentIndex = i;
      }
      if(this.definitions[i].votes.ups > currentHigh) {
        currentHigh = this.definitions[i].votes.ups;
        currentIndex = i;
      }
    }

    return (currentIndex === null) ? null : this.definitions[currentIndex];
  };

  this.definitionExists = function(definition) {
    var existsFlag = false;

    var length = this.definitions.length;
    for(var i=0; i<length; i++) {
      if(this.definitions[i].matches(definition)) {
        existsFlag = true;
      }
    }

    return existsFlag;
  };
};

Reaction.getList = function(db_connection, limit, offset, callback) {

  var collection = db_connection.collection('reactions');
  var cursor = collection.find({ }).sort({count:-1});

  cursor.limit(limit);
  cursor.skip(offset);

  cursor.toArray(function(err, result) {
    _.forEach(result, function (v,k) {
      delete result[k]['_id'];
    })
    callback(result);
  });

};

Reaction.getCount = function(db_connection, callback) {
  var collection = db_connection.collection('reactions');
  var cursor = collection.find({ }).sort({count:-1});

  cursor.count(function(err, count) {
    callback(count);
  });

};
