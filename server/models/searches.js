var helper = require('./models-helper');
var async = require('async');
var _ = require('lodash');

Searches = function(searchterm) {

  this.search = searchterm.toLowerCase();
  this.count = null;

  this.incrementCount = function (db, callback) {
    var collection = db.collection('search');

    collection.findAndModify({search: this.search}, {}, {$inc: {count:1}}, {upsert:true}, function(err, searchDocument) {

      if (searchDocument.value === null ||
          searchDocument.value === null ||
         !searchDocument.value.count) {

        this.Searches.count = 1;

      } else {

        this.Searches.count = this.Searches.count + 1;

      }

      callback(this.Searches);

    });

  }

  this.remove = function (db, callback) {
    var collection = db.collection('search');

    collection.remove({search: this.search}, function(err, object) {
      callback(object.result)
    });

  }

};



Searches.getCount = function(db_connection, callback) {
  var collection = db_connection.collection('search');
  var cursor = collection.find({ }).sort({count:-1});

  cursor.count(function(err, count) {
    callback(count);
  });

};

Searches.getList = function(db_connection, limit, offset, callback) {

  var collection = db_connection.collection('search');
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
