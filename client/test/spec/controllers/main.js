'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('dreApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  describe('Method: initDashboard', function() {

    beforeEach(function() {
      scope.initDashboard();
    });

    it('should have function named $scope.initDashboard()', function () {
      expect(angular.isFunction(scope.initDashboard)).toBe(true);
    });

  });

  describe('Method: $scope.getResults', function() {
    it('should have function named $scope.getResults(keyword)', function () {
      expect(angular.isFunction(scope.getResults)).toBe(true);
    });
  });

  describe('Method: $scope.search', function() {
    it('should have function named $scope.search(keyword)', function () {
      expect(angular.isFunction(scope.search)).toBe(true);
    });
  });

  describe('Method: $scope.openConfirm', function() {
    it('should have function named $scope.openConfirm(reaction, symptomIndex)', function () {
      expect(angular.isFunction(scope.openConfirm)).toBe(true);
    });
  });

  describe('Method: $scope.showErrorModal', function() {
    it('should have function named $scope.showErrorModal(error)', function () {
      expect(angular.isFunction(scope.showErrorModal)).toBe(true);
    });
  });

  describe('Method: $scope.vote', function() {
    it('should have function named $scope.vote(keyword, vote, definitionIndex, symptomIndex)', function () {
      expect(angular.isFunction(scope.vote)).toBe(true);
    });
  });

});
