'use strict';

/**
 * @ngdoc function
 * @name dreApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreApp
 */
angular.module('dreApp')
  .controller('MainCtrl', ['$scope', 'DashboardService', function ($scope, DashboardService) {
    $scope.searchTerm;
    $scope.initDashboard = function() {
      setDashboard();
      $scope.showFilter = false;
    };

    $scope.getResults = function(keyword) {
      $scope.showFilter = true;
      $scope.searchTerm = keyword;
      setDashboard(keyword);
    };

    function setDashboard(keyword) {
      DashboardService.getSymptoms(keyword).then(function (symptoms) {
        $scope.allSymptoms = symptoms;
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
  }]);
