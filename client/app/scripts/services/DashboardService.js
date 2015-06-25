'use strict';

angular
  .module('dreApp')
  .factory('DashboardService', ['$http', '$q', 'openFDA', 'reactions', function($http, $q, openFDA, reactions) {

    function getSymptoms(drugKeyword, filterList) {
      return openFDA.adverseEvents.topSymptoms(drugKeyword, filterList).then(function(data) {
        return data.data.results;
      });
    }

    function getManufacturers(drugKeyword, filterList) {
      return openFDA.adverseEvents.topManufacturers(drugKeyword, filterList).then(function(data) {
        return data.data.results;
      });
    }

    function getBrands(drugKeyword, filterList) {
      return openFDA.adverseEvents.topBrandNames(drugKeyword, filterList).then(function(data) {

        // _.forEach(data.data.results, function(record) {
        //   openFDA.label.getLabelInfoByBrand(record.term).then(function (data) {
        //     record.label = data.data.results;
        //   });
        // });

        return data.data.results;
      });
    }

    function getSeverity(drugKeyword, filterList) {
      return openFDA.adverseEvents.severityCount(drugKeyword, filterList).then(function(data) {

        _.forEach(data.data.results, function(record) {
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

    function getGenders(drugKeyword, filterList) {
      return openFDA.adverseEvents.genderCount(drugKeyword, filterList).then(function(data) {

        _.forEach(data.data.results, function(record) {
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

    return {
      getSymptoms: getSymptoms,
      getManufacturers: getManufacturers,
      getBrands: getBrands,
      getSeverity: getSeverity,
      getGenders: getGenders,
      getCountries: getCountries,
      getEvents: getEvents,
      getSymptomDefinitions: getSymptomDefinitions
    };
  }]);
