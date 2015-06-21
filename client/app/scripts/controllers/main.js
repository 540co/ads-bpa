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

    $scope.initDashboard = function() {

      DashboardService.getSymptoms().then(function (symptoms) {
        $scope.allSymptoms = symptoms;
      });

      DashboardService.getManufacturers().then(function (manufacturers){
        $scope.allManufacturers = manufacturers;
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
  }]);
