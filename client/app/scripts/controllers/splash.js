'use strict';

/**
 * @ngdoc function
 * @name dreApp.controller:SplashCtrl
 * @description
 * # SplashCtrl
 * Controller of the dreApp
 */
angular.module('dreApp')
  .controller('SplashCtrl', ['$scope', '$location', 'DashboardService', function ($scope, $location, DashboardService) {
    $scope.search = function (keyword) {
      $scope.path = $location.path('search').search({'q': keyword});
    };

    $scope.init = function () {
      DashboardService.getSearchTerms().then(function(data){
        $scope.commonSearchTerms = data;
      }, function (error){
        console.log(error);
      });
    };

    //$scope.init();

  }]);
