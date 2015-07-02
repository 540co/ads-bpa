var config = require('../config');

dataManager = function (callback) {

  this.connection = {};
  var mongo_url = config.mongo + config.db;

  var MongoClient = require('mongodb').MongoClient;

  MongoClient.connect(mongo_url, function(err, db) {
    this.connection = db;
    callback(this);
  });

  this.ensureCollectionExists = function(collection, callback) {
      this.connection.createCollection(collection, {}, function (err, collection) {
          callback(err,collection);
      });
  };

  this.close = function(callback) {
      this.connection.close(true, function () {
          this.connection = {};
          callback();
      });
  };

};
