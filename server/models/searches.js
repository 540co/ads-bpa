var _ = require('lodash');
var config = require('../config');

Searches = function(searchterm) {

  this.search = searchterm.toLowerCase();
  this.count = null;

  this.incrementCount = function (db, callback) {
    var collection = db.collection(config.searches_collection);

    search = this;

    collection.findAndModify({search: search.search}, {}, {$inc: {count:1}}, {upsert:true}, function(err, searchDocument) {

      if (searchDocument.value === null ||
          searchDocument.value === null ||
         !searchDocument.value.count) {

        search.count = 0;

      } else {

        search.count = searchDocument.value.count;

      }

      callback(search);

    });

  };

  this.remove = function (db, callback) {
    var collection = db.collection(config.searches_collection);

    collection.remove({search: this.search}, function(err, object) {
      callback(object.result);
    });

  };

};


Searches.getCount = function(db_connection, callback) {
  var collection = db_connection.collection(config.searches_collection);
  var cursor = collection.find({ }).sort({count:-1});

  cursor.count(function(err, count) {
    callback(count);
  });

};

Searches.getList = function(db_connection, limit, offset, callback) {

  var collection = db_connection.collection(config.searches_collection);
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
