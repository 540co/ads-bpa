var config = require('../config');

dataManager = function (callback) {

  this.connection = {};
  var mongo_url = config.mongo + config.db;

  var MongoClient = require('mongodb').MongoClient;

  MongoClient.connect(mongo_url, function(err, db) {
    this.connection = db;
    callback(this);
  });

  this.close = function(callback) {
      this.connection.close(true, function (err, db) {
          this.connection = {};
          callback();
      });
  }

};
