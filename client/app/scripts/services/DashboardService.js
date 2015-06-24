'use strict';

angular
    .module('dreApp')
    .factory('DashboardService', ['$http', '$q', 'openFDA', 'reactions', function ($http, $q, openFDA, reactions) {

      function getSymptoms(drugKeyword) {

        var symptoms = openFDA.adverseEvents.topSymptoms(drugKeyword), symptomCount = openFDA.adverseEvents.symptomCount(drugKeyword);

        return $q.all([symptomCount, symptoms]).then(function (data) {
          var totalCount = data[0].data.meta.results.total, symptomList = data[1].data.results;

          _.forEach(symptomList, function(symptom) {
            symptom.percentage = ((symptom.count / this) * 100).toFixed(1) + '%';
          }, totalCount);

          return symptomList;
        });
      }

      function getSymptomCount(drugKeyword) {
        return openFDA.adverseEvents.symptomCount(drugKeyword).then(function(data) {
          return data.data.meta.results.total;
        }, function(error) {
          return {'count': 0};
        });
      }

      function getManufacturers(drugKeyword) {
        return openFDA.adverseEvents.topManufacturers(drugKeyword).then(function(data) {
          return data.data.results;
        });
      }

      function getBrands(drugKeyword) {
        return openFDA.adverseEvents.topBrandNames(drugKeyword).then(function(data) {
          return data.data.results;
        });
      }

      function getSeverity(drugKeyword) {
        return openFDA.adverseEvents.severityCount(drugKeyword).then(function(data) {

          _.forEach(data.data.results, function (record) {
              switch (record.term) {
              case 1:
                  record.description = "Serious";
                  break;
              case 2:
                  record.description = "Non-Serious";
                  break;
              default:
                  record.description = "Unknown";
                  break;
              }
          });
          return data.data.results;
        });
      }

      function getGenders(drugKeyword) {
        return openFDA.adverseEvents.genderCount(drugKeyword).then(function(data) {

              _.forEach(data.data.results, function (record) {
                  switch (record.term) {
                  case 1:
                      record.description = "Male";
                      break;
                  case 2:
                      record.description = "Female";
                      break;
                  default:
                      record.description = "Unknown";
                      break;
                  }
              });

          return data.data.results;
        });
      }

      function getCountries(drugKeyword) {
        return openFDA.adverseEvents.topCountries(drugKeyword).then(function(data) {
          return data.data.results;
        });
      }

      function getEvents(drugKeyword) {
        return openFDA.adverseEvents.eventCountByDate(drugKeyword).then(function(data) {
          return data.data.results;
        });
      }

      function getSymptomDefinitions(drugKeyword) {
        return reactions.reactions.getSymptomDefinition(drugKeyword).then(function(data) {
          return data.data.definitions;
        });
      }

      function postSymptomDefinitions(drugKeyword) {
        return reactions.reactions.postSymptomDefinition(drugKeyword).then(function(data) {
          return data.data.definitions;
        });
      }

      function postNewDefinition(drugKeyword, definition) {
        return reactions.reactions.postNewDefinition(drugKeyword, definition).then(function(data) {
          return data.data.definitions;
        });
      }

      function postSearchTerm(drugKeyword) {
        return reactions.reactions.postSearchTerm(drugKeyword).then(function(data) {
          return data;
        });
      }

      function putDefinitionVote(drugKeyword, vote, index) {
        return reactions.reactions.putDefinitionVote(drugKeyword, vote, index).then(function(data) {
          return data.data.definitions;
        });
      }

      return {
        getSymptoms: getSymptoms,
        getSymptomCount: getSymptomCount,
        getManufacturers: getManufacturers,
        getBrands: getBrands,
        getSeverity: getSeverity,
        getGenders: getGenders,
        getCountries: getCountries,
        getEvents: getEvents,
        getSymptomDefinitions: getSymptomDefinitions,
        postSymptomDefinitions: postSymptomDefinitions,
        postNewDefinition: postNewDefinition,
        postSearchTerm: postSearchTerm,
        putDefinitionVote: putDefinitionVote
      };
}]);
