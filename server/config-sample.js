config = {};

config.schemes = ['http'];
config.host = "localhost:3000";

config.mongo = "mongodb://localhost:27017/";
config.db = "MONGO_DB_NAME_HERE";
config.reactions_collection = "COLLECTION_FOR_REACTIONS";
config.searches_collection = "COLLECTION_FOR_SEARCHES";

config.dictionaryapi_key = 'API_KEY_HERE';
config.wordnikapi_key = 'API_KEY_HERE';

module.exports = config;
