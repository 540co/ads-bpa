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
      $scope.noResults = false;
    };

    $scope.getResults = function(keyword) {
      $scope.showFilter = true;
      var countPromise = DashboardService.getSymptomCount(keyword);

      $q.all([countPromise]).then(function (data) {
        if(data > 0)
          setDashboard(keyword);
        else
          $scope.noResults = true;

      }, function (error) {
        console.log(error);
      });

      $scope.searchTerm = keyword;
      $scope.definitions = [];
    };

    function setDashboard(keyword) {

      $scope.noResults = false;

      loadSymptoms(keyword)
        .then(parallelLoad);

      DashboardService.getSymptoms(keyword).then(function (symptoms) {

        $scope.allSymptoms = symptoms;
        _.forEach(symptoms, function(symptom) {
          return DashboardService.getSymptomDefinitions(symptom.term);
        });

      }).then(function(definition) {
        $scope.definition = definition;
      });

      DashboardService.getManufacturers(keyword).then(function (manufacturers){
        $scope.allManufacturers = manufacturers;
        var manufacturerNames = [], manufacturerCounts = [];
        _.forEach($scope.allManufacturers, function (manufacturer) {
          manufacturerNames.push(manufacturer.term);
          manufacturerCounts.push(manufacturer.count);
        });
        $scope.manufacturerCounts = manufacturerCounts;
        $scope.manufacturerNames = manufacturerNames;
      });

      DashboardService.getBrands(keyword).then(function (brands){
        $scope.allBrands = brands;
      });

      DashboardService.getSeverity(keyword).then(function (severity){
        $scope.allSeverityCount = severity;
      });

      DashboardService.getGenders(keyword).then(function (genders) {
        $scope.allGenderCount = genders;
      });

      DashboardService.getCountries(keyword).then(function (countries) {
        $scope.allCountries = countries;
      });

      DashboardService.getEvents(keyword).then(function (events) {
        $scope.allEvents = events;
        var eventDates = [], eventCounts = [];
        _.forEach($scope.allEvents, function (event) {
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
      var y = str.substr(0,4),
          m = str.substr(4,2) - 1,
          d = str.substr(6,2);
      var D = new Date(y,m,d);
      return (D.getFullYear() == y && D.getMonth() == m && D.getDate() == d) ? m.toString() + '/' + d + '/' + y : 'invalid date';
    }

    var loadSymptoms = function(drugKeyword) {
      return DashboardService.getSymptoms(drugKeyword);
    },
    parallelLoad = function(symptoms) {

      var allDefs = [];
      var allDefsPost = [];
      var allDefsGetAgain = [];

      // Call reaction lookup service to get reaction definitions
      _.forEach(symptoms, function(symptom, idx) {
        var defCall = DashboardService.getSymptomDefinitions(symptom.term);
        allDefs.push(defCall);
      });


      $q.all(allDefs).then(

        function (data) {

          _.forEach(data, function(definition, idx) {
            if(definition.length === undefined)
              this[idx] = [];
          }, data);

          $scope.definitions = data;
          console.log(data);

        }, function(error) {

          // If any of GET reactions throws an error, go thru and POST this list to fill in the defintions
          _.forEach(symptoms, function(symptom, idx) {
            var defCall = DashboardService.postSymptomDefinitions(symptom.term);
            allDefsPost.push(defCall);
          });

          $q.all(allDefsPost).finally(function (data) {

            _.forEach(symptoms, function(symptom, idx) {
              var defCall = DashboardService.getSymptomDefinitions(symptom.term);
              allDefsGetAgain.push(defCall);
            });

            // Re-call the GET reactions endpoint to update the definitions
            // TODO : This should be updated at some point to not be so heavy handed in GETTING, POSTING and then GETTING again
            $q.all(allDefsGetAgain).then(function (data) {
              $scope.definitions = data;
            });

          });

        });

      return;

    };

  }]);
