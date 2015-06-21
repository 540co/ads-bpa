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
      // openFDA.adverseEvents.topSymptoms().then(function (data) {
      //   $scope.allSymptoms = data.data.results;
      //   $scope.allSymptoms = DashboardService.symptoms
      // });
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

      // openFDA.adverseEvents.topManufacturers().then(function (data) {
      //     $scope.allManufacturers = data.data.results;
      // });
      //
      // openFDA.adverseEvents.topBrandNames().then(function (data) {
      //     $scope.allBrands = data.data.results;
      // });
      //
      // openFDA.adverseEvents.severityCount().then(function (data) {
      //     $scope.allSeverityCount = data.data.results;
      // });
      //
      // openFDA.adverseEvents.genderCount().then(function (data) {
      //     $scope.allGenderCount = data.data.results;
      // });
      //
      // openFDA.adverseEvents.topCountries().then(function (data) {
      //   $scope.allCountries = data.data.results;
      // });
    };

    $scope.getResults = function(keyword) {
      //alert(keyword);
      $scope.showResults = true;
      // openFDA.adverseEvents.topSymptoms(keyword).then(function (data) {
      //     $scope.ibuprofenSymptoms = data.data.results;
      // });
      // openFDA.adverseEvents.topManufacturers(keyword).then(function (data) {
      //     $scope.ibuprofenManufacturers = data.data.results;
      // });
      // openFDA.adverseEvents.topBrandNames(keyword).then(function (data) {
      //     $scope.ibuprofenBrands = data.data.results;
      // });
      // openFDA.adverseEvents.seriousCount(keyword).then(function (data) {
      //     $scope.ibuprofenSeriousCount = data.data.results;
      // });
      // openFDA.adverseEvents.genderCount(keyword).then(function (data) {
      //     $scope.ibuprofenSexCount = data.data.results;
      // });
    };
  }]);
