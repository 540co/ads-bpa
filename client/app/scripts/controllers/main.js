'use strict';

/**
 * @ngdoc function
 * @name dreApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreApp
 */
angular.module('dreApp')
  .controller('MainCtrl', ['$scope', '$q', 'DashboardService', function ($scope, $q, DashboardService) {
    $scope.searchTerm;
    $scope.initDashboard = function() {
      setDashboard();
      $scope.showFilter = false;
    };

    $scope.getResults = function(keyword, filter) {
      var filterList = refreshFilters(filter);
      $scope.showFilter = true;
      $scope.searchTerm = keyword;
      setDashboard(keyword, filterList);
      $scope.definitions = [];
    };

    function setDashboard(keyword, filterList) {

      loadSymptoms(keyword, filterList)
        .then(parallelLoad);

      DashboardService.getSymptoms(keyword, filterList)
      .then(function(symptoms) {
        $scope.allSymptoms = symptoms;
        _.forEach(symptoms, function(symptom) {
          return DashboardService.getSymptomDefinitions(symptom.term);
        });
      }).then(function(definition) {
        $scope.definition = definition;
      });

      DashboardService.getManufacturers(keyword, filterList).then(function(manufacturers) {
        $scope.allManufacturers = manufacturers;
        var manufacturerNames = [],
          manufacturerCounts = [];
        _.forEach($scope.allManufacturers, function(manufacturer) {
          manufacturerNames.push(manufacturer.term);
          manufacturerCounts.push(manufacturer.count);
        });
        $scope.manufacturerCounts = manufacturerCounts;
        $scope.manufacturerNames = manufacturerNames;
      });

      DashboardService.getBrands(keyword, filterList).then(function(brands) {
        $scope.allBrands = brands;
      });

      DashboardService.getSeverity(keyword, filterList).then(function(severity) {
        $scope.allSeverityCount = severity;
      });

      DashboardService.getGenders(keyword, filterList).then(function(genders) {
        $scope.allGenderCount = genders;
      });

      DashboardService.getCountries(keyword, filterList).then(function(countries) {
        $scope.allCountries = countries;
      });

      DashboardService.getEvents(keyword, filterList).then(function(events) {
        $scope.allEvents = events;
        var eventDates = [],
          eventCounts = [];
        _.forEach($scope.allEvents, function(event) {
          eventDates.push(parseDate(event.time));
          eventCounts.push(event.count);
        });
        eventCounts = _.drop(eventCounts, eventCounts.length - 25);
        eventDates = _.drop(eventDates, eventDates.length - 25);
        $scope.eventCounts = [eventCounts];
        $scope.eventDates = eventDates;
      });
    }

    function parseDate(str) {
      var y = str.substr(0, 4),
        m = str.substr(4, 2) - 1,
        d = str.substr(6, 2);
      var D = new Date(y, m, d);
      return (D.getFullYear() == y && D.getMonth() == m && D.getDate() == d) ? m.toString() + '/' + d + '/' + y : 'invalid date';
    }

    var loadSymptoms = function(drugKeyword, filterList) {
        return DashboardService.getSymptoms(drugKeyword, filterList);
      },
      parallelLoad = function(symptoms) {
        var definition = DashboardService.getSymptomDefinitions('death');
        var allDefs = [];

        _.forEach(symptoms, function(symptom) {
          var defCall = DashboardService.getSymptomDefinitions(symptom.term);
          allDefs.push(defCall);
        });

        return $q.all(_.slice(allDefs, 0, 8)).then(function(data) {
          $scope.definitions = data;

        });
      };

    //Checkbox Filter START

    $scope.filterModel = [{
      "name": "ots",
      "type": "product_type",
      "term": "HUMAN OTC DRUG",
      "title": "Over the Counter",
      "value": false
    }, {
      "name": "otc",
      "type": "product_type",
      "term": "HUMAN PRESCRIPTION DRUG",
      "title": "Off the Shelf",
      "value": false
    }];

    function refreshFilters(item) {
      var filterItems = [];
      _.each(item, function(n) {
        var object = {};
        if (n.value == true) {
          object.filter = n.type;
          object.filterText = n.term;
          filterItems.push(object);
        } else {}
      });
      return filterItems;
    }

  }]);
