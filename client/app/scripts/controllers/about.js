'use strict';

/**
 * @ngdoc function
 * @name dreApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dreApp
 */
angular.module('dreApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
