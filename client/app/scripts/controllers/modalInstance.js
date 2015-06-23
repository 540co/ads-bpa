'use strict';

/**
 * @ngdoc function
 * @name dreApp.controller:ModalInstanceCtrl
 * @description
 * # ModalInstanceCtrl
 * Controller of the modals in the dreApp
 */
angular.module('dreApp')
  .controller('ModalInstanceCtrl', ['$scope', 'config', function ($scope, config) {

    $scope.countdown = function() {
      var timer = config.timeoutLength, minutes, seconds;
      setInterval(function () {
          minutes = parseInt(timer / 60, 10);
          seconds = parseInt(timer % 60, 10);

          minutes = minutes < 10 ? '0' + minutes : minutes;
          seconds = seconds < 10 ? '0' + seconds : seconds;

          if (--timer < 0) {
            location.reload();
          }
      }, 1000);
    };

    $scope.countdown();
}]);
