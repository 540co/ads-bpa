var config = {};

config.schemes = ['http'];
config.host = "localhost:3000";

config.mongo = "mongodb://localhost:27017/";
config.db = "MONGO DB NAME HERE";
config.reactions_collection = "COLLECTION_FOR_REACTIONS";
config.searches_collection = "COLLECTION_FOR_SEARCHES";

config.dictionaryapi_key = 'API KEY HERE';
config.wordnikapi_key = 'API KEY HERE';

module.exports = config;
