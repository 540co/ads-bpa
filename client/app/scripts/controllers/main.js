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
    $scope.$on('create', function (event, chart) {
      console.log(chart);
    });

  //   $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  // $scope.data = [
  //   [65, 59, 80, 81, 56, 55, 40]
  // ];

    $scope.initDashboard = function() {


      DashboardService.getSymptoms().then(function (symptoms) {
        $scope.allSymptoms = symptoms;
      });

      DashboardService.getManufacturers().then(function (manufacturers){
        $scope.allManufacturers = manufacturers;
        var manufacturerNames = [], manufacturerCounts = [];
        _.forEach($scope.allManufacturers, function (manufacturer) {
          manufacturerNames.push(manufacturer.term);
          manufacturerCounts.push(manufacturer.count);
        });
        $scope.manufacturerCounts = manufacturerCounts;
        $scope.manufacturerNames = manufacturerNames;
      });

      DashboardService.getBrands().then(function (brands){
        $scope.allBrands = brands;
      });

      DashboardService.getSeverity().then(function (severity){
        $scope.allSeverityCount = severity;
      });

      DashboardService.getGenders().then(function (genders) {
        $scope.allGenderCount = genders;
      });

      DashboardService.getCountries().then(function (countries) {
        $scope.allCountries = countries;
      });

      DashboardService.getEvents().then(function (events) {
        $scope.allEvents = events;
        var eventDate = [], eventCounts = [];
        _.forEach($scope.allEvents, function (event) {
          eventDate.push(parseDate(event.time));
          eventCounts.push(event.count);
        });
        eventCounts = _.drop(eventCounts, eventCounts.length - 25);
        eventDate = _.drop(eventDate, eventDate.length - 25);
        $scope.data = [eventCounts];
        $scope.labels = eventDate;
      });

    };

    $scope.getResults = function(keyword) {

      DashboardService.getSymptoms(keyword).then(function (symptoms) {
        $scope.allSymptoms = symptoms;
      });

      DashboardService.getManufacturers(keyword).then(function (manufacturers){
        $scope.allManufacturers = manufacturers;
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
      });

    };

    function parseDate(str) {
    var y = str.substr(0,4),
        m = str.substr(4,2) - 1,
        d = str.substr(6,2);
    var D = new Date(y,m,d);
    return (D.getFullYear() == y && D.getMonth() == m && D.getDate() == d) ? m.toString() + '/' + d + '/' + y : 'invalid date';
}
  }]);
