'use strict';

describe('Controller: SplashCtrl', function () {

  // load the controller's module
  beforeEach(module('dreApp'));

  var AboutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutCtrl = $controller('SplashCtrl', {
      $scope: scope
    });
  }));

  describe('Method: init', function() {

    beforeEach(function() {
      scope.init();
    });

    it('should have function named $scope.init()', function () {
      expect(angular.isFunction(scope.init)).toBe(true);
    });

  });

  describe('Method: search', function() {

    it('should have function named $scope.search()', function () {
      expect(angular.isFunction(scope.search)).toBe(true);
    });

  });

});
