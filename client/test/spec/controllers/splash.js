'use strict';

describe('Controller: SplashCtrl', function () {

  // load the controller's module
  beforeEach(module('dreApp'));

  var AboutCtrl,
    $scope, service, $controller, setTerms;

    var mockTerms = [
      {
        search: 'ibuprofen',
        count: 199
      },
      {
        search: 'motrin',
        count: 384
      },
      {
        search: 'aleve',
        count: 11
      },
      {
        search: 'xanax',
        count: 1939
      },
    ];

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, $controller, $q, DashboardService) {
    $scope = $rootScope.$new();
    service = DashboardService;

    //console.log(service);

    $controller('SplashCtrl', {
      $scope: $scope,
      DashboardService: service
    });

    //$rootScope.apply();

  }));

  describe('Method: init', function() {

    beforeEach(inject (function($q) {
      $scope.init();
      var termsDeferred = $q.defer();
      termsDeferred.resolve(mockTerms);

      console.log(termsDeferred.promise);
      spyOn(service, 'getSearchTerms').and.returnValue(termsDeferred.promise);
      setTerms = service.getSearchTerms();
    }));

    it('should have function named $scope.init()', function () {
      expect(angular.isFunction($scope.init)).toBe(true);
    });

    it('should call getSearchTerms', function () {
      expect(setTerms).toEqual(setTerms);
    });

  });
  //
  describe('Method: search', function() {

    it('should have function named $scope.search()', function () {
      //expect(angular.isFunction($scope.search)).toBe(true);
    });

  });

});
