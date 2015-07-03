var checkIndices = require('./models-helper');
require('async');
var _ = require('lodash');
var config = require('../config');

Reaction = function(reactionterm) {

  this.reaction = reactionterm.toLowerCase();
  this.definitions = [];
  this.last_updated;

  this.isValid = function() {
    var validFlag = true;

    if(typeof this.reaction !== 'string' ||
       typeof this.definitions !== 'object') {
      validFlag = false;
    }

    var listOfKeys = ['reaction', 'definitions', 'last_updated',
                      'isValid', 'find', 'remove', 'upsert', 'addDefinition',
                      'definitionExists', 'definitionIndexExists', 'vote'];

    if(checkIndices(this, listOfKeys) === false) {
      validFlag = false;
    }

    return validFlag;
  };


  this.find = function (db_connection, callback) {
    var collection = db_connection.collection(config.reactions_collection);
    reaction = this;

    collection.findOne({'reaction': reaction.reaction}, function(err, res) {
      if (err || !res) {
        callback(null);
      }

      if (res) {
        reaction.definitions = res.definitions;
        reaction.last_updated = res.last_updated;
        callback(reaction);
      }

    });

  };

  this.remove = function (db, callback) {
    var collection = db.collection(config.reactions_collection);
    reaction = this;

    collection.remove({reaction: reaction.reaction}, function(err, object) {
      callback(object.result);
    });

  };

  this.upsert = function(db, callback) {
    var collection = db.collection(config.reactions_collection);
    reaction = this;
    reaction.last_updated = new Date().getTime();

    collection.update({reaction:reaction.reaction}, {$set: reaction}, {upsert:true}, function(err, object) {
      callback(reaction);
    });

  };

  this.addDefinition = function(def) {

    reaction = this;

    if (def.constructor === Array) {

      _.forEach(def, function (v,k) {
        reaction.definitions.push(v);
      });

    } else {

      reaction.definitions.push(def);
    }

    return true;
  };

  this.definitionExists = function(definition) {
    reaction = this;

    var existsFlag = false;

    var length = reaction.definitions.length;

    for(var i=0; i<length; i++) {

      if(reaction.definitions[i].definition == definition) {
        existsFlag = true;
      }
    }

    return existsFlag;
  };

  this.definitionIndexExists = function(definition_idx) {
    reaction = this;

    if (reaction.definitions[definition_idx]) {
      return true;
    } else {
      return false;
    }
  };

  this.vote = function(definition_idx,vote) {
    if (vote.toLowerCase() == "up") {
      this.definitions[definition_idx].votes.ups++;
    }
    if (vote.toLowerCase() == "down") {
      this.definitions[definition_idx].votes.downs++;
    }
  };


};

Reaction.getList = function(db_connection, limit, offset, callback) {

  var collection = db_connection.collection(config.reactions_collection);
  var cursor = collection.find({ }).sort({count:-1});

  cursor.limit(limit);
  cursor.skip(offset);

  cursor.toArray(function(err, result) {
    _.forEach(result, function (v,k) {
      delete result[k]['_id'];
    });
    callback(result);
  });

};

Reaction.getCount = function(db_connection, callback) {
  var collection = db_connection.collection(config.reactions_collection);
  var cursor = collection.find({ }).sort({count:-1});

  cursor.count(function(err, count) {
    callback(count);
  });

};

module.exports = Reaction;
