'use strict';

angular
    .module('dreApp')
    .factory('DashboardService', ['$http', '$q', 'openFDA', function ($http, $q, openFDA) {

      function getSymptoms(drugKeyword) {
        return openFDA.adverseEvents.topSymptoms(drugKeyword).then(function(data) {
          return data.data.results;
        });
      }

      function getManufacturers(drugKeyword) {
        return openFDA.adverseEvents.topManufacturers(drugKeyword).then(function(data) {
          return data.data.results;
        });
      }

      function getBrands(drugKeyword) {
        return openFDA.adverseEvents.topBrandNames(drugKeyword).then(function(data) {

          _.forEach(data.data.results, function(record) {
            openFDA.label.getLabelInfoByBrand(record.term).then(function (data) {
              record.label = data.data.results;
            });
          });

          return data.data.results;
        });
      }

      function getSeverity(drugKeyword) {
        return openFDA.adverseEvents.severityCount(drugKeyword).then(function(data) {

          _.forEach(data.data.results, function (record) {
              switch (record.term) {
              case 1:
                  record.term = "Serious";
                  break;
              case 2:
                  record.term = "Non-Serious";
                  break;
              default:
                  record.term = "Unknown";
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
                      record.term = "Male";
                      break;
                  case 2:
                      record.term = "Female";
                      break;
                  default:
                      record.term = "Unknown";
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
        return openFDA.adverseEvents.eventCountByDate().then(function(data) {
          return data.data.results;
        });
      }

      return {
        getSymptoms: getSymptoms,
        getManufacturers: getManufacturers,
        getBrands: getBrands,
        getSeverity: getSeverity,
        getGenders: getGenders,
        getCountries: getCountries,
        getEvents: getEvents
      };
}]);
