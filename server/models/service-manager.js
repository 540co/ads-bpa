var request = require('request');
var _ = require('lodash');
var xml2js = require('xml2js');

serviceManager = {};

// Fetch dictionary definitions from Wordnik API
serviceManager.getDefinitionsFromWordnikApi = function (term, api_key, callback) {

    var url = "http://api.wordnik.com:80/v4/word.json/" + encodeURIComponent(term.toLowerCase()) + "/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=" + api_key;
    request(url, function (error, response, body) {

      var definitions = [];

      if (!error && response.statusCode === 200) {
        var deflist = JSON.parse(body);
        if (deflist[0]) {
          _.forEach(deflist, function(v,k) {

            var definition = new Definition();

            if (v.partOfSpeech === "noun") {
              var dt = new Date();

              definition.definition = v.text;
              definition.source = 'wordnik.com';
              definition.created_at = dt.getTime();
              definition.votes = new Votes();
              definitions.push(definition);
            }

          });

        }

        callback(definitions);

      } else {

        // TODO: Add some type of catch error from API and provide back a
        // a different response - at this time there will simply be no
        // dictionary records provided back to the reaction dictionary

        callback(definitions);
      }

    });

}

// Fetch dictionary definitions from Dictionary API (Medical Dictionary)
serviceManager.getDefinitionsFromDictionaryApi = function (term, api_key, callback) {

    var url = "http://www.dictionaryapi.com/api/v1/references/medical/xml/" + encodeURIComponent(term.toLowerCase()) + "?key=" + api_key;

    request(url, function (error, response, body) {

      var definitions = [];

      if ((!error && response.statusCode === 200) &&
        body !== "Invalid API key or reference name provided.") {

        var parser = new xml2js.Parser({ignoreAttrs: false});

        parser.parseString(body, function (err, result) {

          if (result) {

          _.forEach(result.entry_list.entry, function(v,k) {

            if (v['$'].id === encodeURIComponent(term.toLowerCase())) {

                if (v.def) {

                  if (Array.isArray(v.def[0].sensb[0].sens)) {

                      _.forEach(v.def[0].sensb, function (v,k) {

                        if (v.sens[0].dt[0]['_']) {

                          if (typeof v.sens[0].dt[0]['_'] === "string") {

                            var definition = new Definition();
                            var dt = new Date();

                            definition.definition = v.sens[0].dt[0]['_'];
                            definition.source = 'dictionaryapi.com';
                            definition.created_at = dt.getTime();
                            definition.votes = new Votes();
                            definitions.push(definition);

                          }

                        } else {
                          var def = {};
                          if (typeof v.sens[0].dt[0] === "string") {

                            var definition = new Definition();
                            var dt = new Date();

                            definition.definition = v.sens[0].dt[0];
                            definition.source = 'dictionaryapi.com';
                            definition.created_at = dt.getTime();
                            definition.votes = new Votes();
                            definitions.push(definition);

                          }

                        }

                      });

                    } else {

                      if (typeof v.def[0].sensb[0].sens[0].dt === "string") {

                        var definition = new Definition();
                        var dt = new Date();

                        definition.definition = v.def[0].sensb[0].sens[0].dt;
                        definition.source = 'dictionaryapi.com';
                        definition.created_at = dt.getTime();
                        definition.votes = new Votes();
                        definitions.push(definition);

                      }

                      }

                    }

                }
            });
            }

          });

          callback(definitions);

      } else {

        // TODO: Add some type of catch error from API and provide back a
        // a different response - at this time there will simply be no
        // dictionary records provided back to the reaction dictionary

        callback(definitions);
      };

    });




}
