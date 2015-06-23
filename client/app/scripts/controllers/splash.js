'use strict';

/**
 * @ngdoc function
 * @name dreApp.controller:SplashCtrl
 * @description
 * # SplashCtrl
 * Controller of the dreApp
 */
angular.module('dreApp')
  .controller('SplashCtrl', function ($scope, $location) {
    $scope.search = function (keyword) {
      //$location.path('search');
      $location.path('search').search({'q': keyword});
    }
  });
