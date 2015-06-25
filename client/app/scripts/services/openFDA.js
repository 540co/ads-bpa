'use strict';

angular
  .module('dreApp')
  .factory('openFDA', ['$http', '$q', 'config', function($http, $q, config) {

    var apiKey = 'api_key=' + config.apiKey;

    if (!window.console) console = {
      log: function() {}
    };

    var requestParams = function(custom) {
      var commonParams = {
        method: 'GET',
        responseType: 'json',
        cache: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      return angular.extend(commonParams, custom);
    };

    var catalogEndpoint = function(catalog, resource) {
      var openFDAApiUrl = 'https://api.fda.gov/';

      var catalogs = {
        drugAdverseEvent: 'drug/event.json?' + apiKey,
        drugLabel: 'drug/label.json?' + apiKey
      };
      return openFDAApiUrl + catalogs[catalog] + resource;
    };

    var adverseEvents = {
      topSymptoms: function(drugKeyword, filterList) {

        //create url string to share across all query options
        var url = '&count=patient.reaction.reactionmeddrapt.exact&limit=25';

        //function that determines structure and returns url for openFDA api call
        return generateQuery(url, drugKeyword, filterList);

      },
      topManufacturers: function(drugKeyword, filterList) {

        //create url string to share across all query options
        var url = '&count=patient.drug.openfda.manufacturer_name.exact&limit=25';

        //function that determines structure and returns url for openFDA api call
        return generateQuery(url, drugKeyword, filterList);

      },
      topBrandNames: function(drugKeyword, filterList) {

        //create url string to share across all query options
        var url = '&count=patient.drug.openfda.brand_name.exact&limit=25';

        //function that determines structure and returns url for openFDA api call
        return generateQuery(url, drugKeyword, filterList);

      },
      severityCount: function(drugKeyword, filterList) {

        //create url string to share across all query options
        var url = '&count=serious&limit=25';

        //function that determines structure and returns url for openFDA api call
        return generateQuery(url, drugKeyword, filterList);

      },
      genderCount: function(drugKeyword, filterList) {

        //create url string to share across all query options
        var url = '&count=patient.patientsex&limit=25';

        //function that determines structure and returns url for openFDA api call
        return generateQuery(url, drugKeyword, filterList);

      },
      topCountries: function(drugKeyword, filterList) {

        //create url string to share across all query options
        var url = '&count=occurcountry.exact&limit=25';

        //function that determines structure and returns url for openFDA api call
        return generateQuery(url, drugKeyword, filterList);
        
      },
      eventCountByDate: function(drugKeyword, filterList) {

        //create url string to share across all query options
        var url = '&search=receivedate:[2010101+TO+20150101]&count=receivedate';

        //function that determines structure and returns url for openFDA api call
        return generateQuery(url, drugKeyword, filterList);

      }
    };

    var label = {
      getLabelInfoByBrand: function(drugKeyword, filterList) {

        //create url string to share across all query options
        var url = '&search=openfda.brand_name:' + encodeURIComponent(drugKeyword);

        //function that determines structure and returns url for openFDA api call
        return generateQuery(url, drugKeyword, filterList);

      }
    };

    var generateQuery = function(url, drugKeyword, filterList){
      //create other url parts to dynically create query strings
      var postUrl = '';
      var preUrl = '';

      //function to create the multiple avenues for search term and filter combos
      if (drugKeyword && (typeof filterList === null || filterList < 1)) {
        url = '&search=(patient.drug.openfda.brand_name:' + encodeURIComponent(drugKeyword) + '+patient.drug.openfda.substance_name:' + encodeURIComponent(drugKeyword) + ')' + url;
      }

      if (drugKeyword && filterList.length === 1) {
        url = '&search=(patient.drug.openfda.brand_name:' + encodeURIComponent(drugKeyword) + '+patient.drug.openfda.substance_name:' + encodeURIComponent(drugKeyword) + ')' + '+AND+' + 'patient.drug.openfda.' + filterList[0].filter + ':"' + encodeURIComponent(filterList[0].filterText) + '"' + url;
      }

      if (drugKeyword && filterList.length > 1) {
        var endUrl = url;
        url = '&search=(patient.drug.openfda.brand_name:' + encodeURIComponent(drugKeyword) + '+patient.drug.openfda.substance_name:' + encodeURIComponent(drugKeyword) + ')';
        _.each(filterList),
          function(n) {
            var param = " + '+AND+' + '" + n.filter + ": + " + encodeURIComponent(n.filterText) + "+";
            url = url.concat(param);
          };
        url = url + endUrl;
      }

      return $http(requestParams({
        url: catalogEndpoint('drugAdverseEvent', url),
      }));
    };


    return {
      adverseEvents: adverseEvents,
      label: label,
    };



  }]); //END FACTORY
