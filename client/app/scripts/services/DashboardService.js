'use strict';

angular
  .module('dreApp')
  .factory('DashboardService', ['$http', '$q', 'openFDA', 'reactions', function($http, $q, openFDA, reactions) {

      function getSymptoms(drugKeyword, filterList) {

        var symptoms = openFDA.adverseEvents.topSymptoms(drugKeyword, filterList), symptomCount = openFDA.adverseEvents.symptomCount(drugKeyword, filterList);

        return $q.all([symptomCount, symptoms]).then(function (data) {
          var totalCount = data[0].data.meta.results.total, symptomList = data[1].data.results;

          _.forEach(symptomList, function(symptom) {
            symptom.percentage = ((symptom.count / this) * 100).toFixed(1) + '%';
          }, totalCount);

          return symptomList;
        });
      }

      function getSymptomCount(drugKeyword, filterList) {
        return openFDA.adverseEvents.symptomCount(drugKeyword, filterList).then(function(data) {
          return data.data.meta.results.total;
        }, function(error) {
          return {'count': 0};
        });
      }

    function getManufacturers(drugKeyword, filterList) {
      return openFDA.adverseEvents.topManufacturers(drugKeyword, filterList).then(function(data) {
        return data.data.results;
      });
    }

      function getBrands(drugKeyword, filterList) {
        return openFDA.adverseEvents.topBrandNames(drugKeyword, filterList).then(function(data) {
          return data.data.results;
        });
      }

    function getSeverity(drugKeyword, filterList) {
      return openFDA.adverseEvents.severityCount(drugKeyword, filterList).then(function(data) {

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

    function getGenders(drugKeyword, filterList) {
      return openFDA.adverseEvents.genderCount(drugKeyword, filterList).then(function(data) {

        _.forEach(data.data.results, function(record) {
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

    function getCountries(drugKeyword, filterList) {
      return openFDA.adverseEvents.topCountries(drugKeyword, filterList).then(function(data) {
        return data.data.results;
      });
    }

    function getEvents(drugKeyword, filterList) {
      return openFDA.adverseEvents.eventCountByDate(drugKeyword, filterList).then(function(data) {
        return data.data.results;
      });
    }

    function getSymptomDefinitions(drugKeyword, filterList) {
      return reactions.reactions.getSymptomDefinition(drugKeyword, filterList).then(function(data) {
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

      function getSearchTerms() {
        return reactions.reactions.getSearchTerm().then(function(data) {
          return data.data.data;
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
        getSearchTerms: getSearchTerms,
        getSymptomDefinitions: getSymptomDefinitions,
        postSymptomDefinitions: postSymptomDefinitions,
        postNewDefinition: postNewDefinition,
        postSearchTerm: postSearchTerm,
        putDefinitionVote: putDefinitionVote
      };
}]);
