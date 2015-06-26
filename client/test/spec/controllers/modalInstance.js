'use strict';

describe('Controller: ModalInstanceCtrl', function () {

  // load the controller's module
  beforeEach(module('dreApp'));

  var AboutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutCtrl = $controller('ModalInstanceCtrl', {
      $scope: scope
    });
  }));

  describe('Method: countdown', function() {

    it('should have function named $scope.countdown()', function () {
      expect(angular.isFunction(scope.countdown)).toBe(true);
    });

  });

});

describe('Controller: DefinitionModalCtrl', function () {

  // load the controller's module
  beforeEach(module('dreApp'));

  var AboutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutCtrl = $controller('DefinitionModalCtrl', {
      $scope: scope
    });
  }));

});
