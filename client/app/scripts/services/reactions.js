'use strict';

angular
    .module('dreApp')
    .factory('reactions', ['$http', '$q', 'config', function ($http, $q, config) {

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

        var postParams = function (custom) {
          var commonParams = {
              method: 'POST',
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
            var reactionsApiUrl = 'http://dre.540.co/api/';

            var catalogs = {
                reactions: 'reactions/'
            };
            return reactionsApiUrl + catalogs[catalog] + resource;
        };

        var reactions = {
            getSymptomDefinition: function (drugKeyword) {
                var searchTerm = drugKeyword;

                return $http(requestParams({
                    url: catalogEndpoint('reactions', searchTerm),
                }));
            }
        };

        return {
            reactions: reactions
        };
  }]);
