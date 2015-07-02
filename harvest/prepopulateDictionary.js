var request = require('request');
var _ = require('lodash');
var async = require('async');
var math = require('math');

if (!process.argv[2] || !process.argv[3] || !process.argv[4] || !process.argv[5]) {
  console.log();
  console.log("---");
  console.log("dre-reaction-dictionary-warmer");
  console.log("---");
  console.log("node prepopulateDictionary.js [dre_reaction_uri] [openFDA_api_key] [FROM_YYYY] [TO_YYYY]");
  console.log("");
  console.log("Please refer to the README for more details.");
  console.log("---");
  console.log();

} else {

  var dre_reaction_uri = process.argv[2];
  var api_key = process.argv[3];
  var from_year = process.argv[4];
  var to_year = process.argv[5];

  var openFdaDrugEventUrl = 'https://api.fda.gov/drug/event.json';

  var eventDailyQueryUrls = [];
  var eventPageUrls = [];

  // For each reaction provided, the DRE /reactions endpoint is sent a POST with the reaction to warm the dictionary
  var postReactions = function (reactionmeddrapt, callback) {

    _.forEach (reactionmeddrapt, function (v,k) {

      reaction = v.toLowerCase();

      url = dre_reaction_uri;

      reactionbody = {'reaction' : reaction};

      request({method: 'POST', uri: url, json: reactionbody}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('['+ response.statusCode +'] ' + body.data.reaction + ' successfully added to reaction directory (' + body.data.definitions.length + ' definitions found)');
        }

        else if (!error && (response.statusCode == 400 || response.statusCode == 422)) {
          console.log('['+ response.statusCode +'] duplicate reaction (' + response.request.uri.href + ')');
        } else {
          console.log('['+ response.statusCode +'] unknown error (' + response.request.uri.href + ')');
          console.log('---');
          console.log(body);
          console.log('---');
        }

      });

    });

  };

  // Calls each URL provided that returns the OpenFDA drug/events and parses the page into a set of unique reactions and makes a call to postReaction iwth the list
  var getReactions = function (apiUrl, callback) {

      reactionCount = 0;

      request(apiUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var results = JSON.parse(body);

          var reactionmeddrapt = [];

          _.forEach(results.results, function (v, k) {
              reactionCount = reactionCount + v.patient.reaction.length;
            _.forEach(v.patient.reaction, function (rv, rk) {
              reactionmeddrapt.push(rv.reactionmeddrapt);
            });
          });


          postReactions(_.uniq(reactionmeddrapt), function(result) {

          });

        }
        callback(null);

      });

  };

  // Calls OpenFDA url provided and determines the total number of pages to build a list of urls that properly apply the skip query parameter
  var getEventPageUrlsPerDay = function (apiUrl, callback) {
      request(apiUrl.url, function (error, response, body) {
        if (!error && response.statusCode == 404) {
            console.log('[' + apiUrl.year + '' + apiUrl.month + '' + apiUrl.day + '] ' + 0 + ' records found | ' + 0 + ' pages');
        }
        if (!error && response.statusCode == 200) {
          var results = JSON.parse(body);

          var total = results.meta.results.total;

          var limit = 100;
          var pages = math.ceil(total / limit);

          console.log('[' + apiUrl.year + '' + apiUrl.month + '' + apiUrl.day + '] ' + total + ' records found | ' + pages + ' pages');

          if (total > 5000) {
            console.log('WARNING - Due to the skip limit, we may miss some unique records [https://opendata.stackexchange.com/questions/5440/openfda-api-including-the-skip-parameter-limit]');
          }

          for (var p = 0; p < pages; p++) {
            var apiUrl_pages =  openFdaDrugEventUrl + '?search=receivedate:[' + apiUrl.year + apiUrl.month + apiUrl.day + '+TO+' + apiUrl.year + apiUrl.month + apiUrl.day + ']&skip=' + (p*limit) + '&limit=' + limit + '&api_key=' + api_key;
            eventPageUrls.push(apiUrl_pages);
          }
        }

        callback(null);

      });

  };

  // Builds list of search urls to call open fda for the complete range between the from and to year provided
  var getEventTotalCountUrlsPerDay = function (callback) {

    var years = {from:from_year, to:to_year};

    var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    var days = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];

    for (var year = years.from; year <= years.to; year++) {
      _.forEach (months, function (month) {
          _.forEach (days, function (day) {
            var urlObj = {};
            urlObj.month = month;
            urlObj.day = day;
            urlObj.year = year;
            urlObj.url = openFdaDrugEventUrl + '?search=receivedate:[' + year + month + day + '+TO+' + year + month + day + ']&limit=0&api_key=' + api_key;
            eventDailyQueryUrls.push(urlObj);
        });
    });

    }

    callback();

  };

  async.series([
      // Create a list of API URL routes designed query the drug/event API to determine total records to determine skip depth...
      function(callback){
        console.log('---');
        console.log('[START]');
        console.log('---');
        console.log('BUILDING LIST OF QUERY URLS TO CALL OPENFDA DRUG/EVENT ENDPOINT');
        console.log('FROM: ' + from_year + ' TO: ' + to_year);
        getEventTotalCountUrlsPerDay(callback);
      },

      // ... and then call routes to build URL list for all pages of drug / events ...
      function(callback){
        console.log('---');
        console.log('MAKING AN INITIAL CALL TO OPENFDA TO DETERMINE TOTAL NUMBER OF PAGES');
        async.eachSeries(eventDailyQueryUrls, getEventPageUrlsPerDay, function(err){
              callback();
            }, function(err) {
              console.log(err);
              callback();
          });
      },

      // ... and then call all page urls to get unique reaction list ...
      function(callback){
        console.log('---');
        console.log('GETTING UNIQUE REACTIONS FOR EACH PAGE OF RECORDS AND POSTING TO:');
        console.log(dre_reaction_uri);
        async.eachSeries(eventPageUrls, getReactions, function(err){
              callback();
            }, function(err) {
              console.log(err);
              callback();
          });
      },

      function(callback){
        console.log('---');
        console.log('[DONE]');
      }
  ]);

}
