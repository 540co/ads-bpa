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
            var reactionsApiUrl = config.reactionUrl;

            var catalogs = {
                reactions: 'reactions/',
                search: 'searches'
            };
            return reactionsApiUrl + catalogs[catalog] + resource;
        };

        var postEndpoint = function (catalog) {
            var reactionsApiUrl = config.reactionUrl;

            var catalogs = {
                reactions: 'reactions',
                search: 'searches'
            };
            return reactionsApiUrl + catalogs[catalog];
        };

        var putEndpoint = function (catalog, drugKeyword, index) {
          var reactionsApiUrl = config.reactionUrl;

          var catalogs = {
              reactions: 'reactions/'
          };

          return reactionsApiUrl + catalogs[catalog] + drugKeyword + '/definitions/' + index;
        };


        var reactions = {
            getSymptomDefinition: function (drugKeyword) {
                var searchTerm = drugKeyword;

                return $http(requestParams({
                    url: catalogEndpoint('reactions', searchTerm),
                }));
            },
            postSymptomDefinition: function (drugKeyword) {
                var body = {"reaction":drugKeyword};

                return $http(requestParams({
                    method:'POST', url: postEndpoint('reactions'), headers: {'Content-Type': 'application/json'}, data: body
                }));
            },
            getSearchTerm: function () {
                var limit = '?limit=100';

                return $http(requestParams({
                    url: catalogEndpoint('search', limit),
                }));
            },
            postSearchTerm: function (drugKeyword) {
                var body = {"search":drugKeyword};

                return $http(requestParams({
                    method:'POST', url: postEndpoint('search'), headers: {'Content-Type': 'application/json'}, data: body
                }));
            },
            postNewDefinition: function (drugKeyword, newDefinition) {
              var body = { "definition": newDefinition };

              return $http(requestParams({
                  method:'POST', url: postEndpoint('reactions') + '/' + drugKeyword + 'definitions', headers: {'Content-Type': 'application/json'}, data: body
              }));
            },
            putDefinitionVote: function (drugKeyword, vote, index) {
              var body = {"vote": vote};

              return $http(requestParams({
                  method:'PUT', url: putEndpoint('reactions', drugKeyword, index), headers: {'Content-Type': 'application/json'}, data: body
              }));
            }
        };

        return {
            reactions: reactions
        };
  }]);
