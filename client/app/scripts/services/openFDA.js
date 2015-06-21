'use strict';

angular
    .module('dreApp')
    .factory('openFDA', ['$http', '$q', 'config', function ($http, $q, config) {

        var apiKey = 'api_key=' + config.apiKey;

        if (!window.console) console = {
            log: function () {}
        };

        var requestParams = function (custom) {
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

        var catalogEndpoint = function (catalog, resource) {
            var openFDAApiUrl = 'https://api.fda.gov/';

            var catalogs = {
                drugAdverseEvent: 'drug/event.json?' + apiKey,
                drugLabel: 'drug/label.json?' + apiKey
            };
            return openFDAApiUrl + catalogs[catalog] + resource;
        };

        var adverseEvents = {
            topSymptoms: function (drugKeyword) {
                var url = '&count=patient.reaction.reactionmeddrapt.exact&limit=25';
                if (drugKeyword)
                    url = '&search=(patient.drug.openfda.brand_name:' + encodeURIComponent(drugKeyword) + '+patient.drug.openfda.substance_name:' + encodeURIComponent(drugKeyword) + ')' + url;

                return $http(requestParams({
                    url: catalogEndpoint('drugAdverseEvent', url),
                }));
            },
            topManufacturers: function (drugKeyword) {
                var url = '&count=patient.drug.openfda.manufacturer_name.exact&limit=25';
                if (drugKeyword)
                    url = '&search=(patient.drug.openfda.brand_name:' + encodeURIComponent(drugKeyword) + '+patient.drug.openfda.substance_name:' + encodeURIComponent(drugKeyword) + ')' + url;

                return $http(requestParams({
                    url: catalogEndpoint('drugAdverseEvent', url),
                }));
            },
            topBrandNames: function (drugKeyword) {
                var url = '&count=patient.drug.openfda.brand_name.exact&limit=25';
                if (drugKeyword)
                    url = '&search=(patient.drug.openfda.brand_name:' + encodeURIComponent(drugKeyword) + '+patient.drug.openfda.substance_name:' + encodeURIComponent(drugKeyword) + ')' + url;

                return $http(requestParams({
                    url: catalogEndpoint('drugAdverseEvent', url),
                }));
            },
            severityCount: function (drugKeyword) {
                var url = '&count=serious&limit=25';
                if (drugKeyword)
                    url = '&search=(patient.drug.openfda.brand_name:' + encodeURIComponent(drugKeyword) + '+patient.drug.openfda.substance_name:' + encodeURIComponent(drugKeyword) + ')' + url;

                return $http(requestParams({
                        url: catalogEndpoint('drugAdverseEvent', url),
                    }));
            },
            genderCount: function (drugKeyword) {
                var url = '&count=patient.patientsex&limit=25';
                if (drugKeyword)
                    url = '&search=(patient.drug.openfda.brand_name:' + encodeURIComponent(drugKeyword) + '+patient.drug.openfda.substance_name:' + encodeURIComponent(drugKeyword) + ')' + url;

                return $http(requestParams({
                        url: catalogEndpoint('drugAdverseEvent', url),
                    }));
            },
            topCountries: function (drugKeyword) {
                var url = '&count=occurcountry.exact&limit=25';
                if (drugKeyword)
                    url = '&search=(patient.drug.openfda.brand_name:' + encodeURIComponent(drugKeyword) + '+patient.drug.openfda.substance_name:' + encodeURIComponent(drugKeyword) + ')' + url;

                    return $http(requestParams({
                        url: catalogEndpoint('drugAdverseEvent', url),
                    }));
            },
            eventCountByDate: function (drugKeyword) {
              var url = '&search=receivedate:[20040101+TO+20150101]&count=receivedate';
              
                  return $http(requestParams({
                      url: catalogEndpoint('drugAdverseEvent', url),
                  }));
            }
        };

        var label = {
          getLabelInfoByBrand: function(drugKeyword) {
            var url='&search=openfda.brand_name:'+ encodeURIComponent(drugKeyword);

            return $http(requestParams({
              url: catalogEndpoint('drugLabel', url),
            }));
          }
        };

        return {
            adverseEvents: adverseEvents,
            label: label
        };
  }]);
