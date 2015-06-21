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

  describe('Method: getResults', function() {
  it('should have function named $scope.getResults(keyword)', function () {
    expect(angular.isFunction(scope.getResults)).toBe(true);
  });
});

});
