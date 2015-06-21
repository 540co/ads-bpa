var config = {}

config.mongo = "mongodb://mongo:27017/";
config.db = "dre";
config.dictionaryapi_key = 'process.env.API_KEY_DICTIONARY';
config.wordnikapi_key = 'process.env.API_KEY_WORDNIK';

module.exports = config;
