'use strict';

describe('Controller: SplashCtrl', function () {

  // load the controller's module
  beforeEach(module('dreApp'));

  var AboutCtrl,
    $scope, service, $controller, setTerms, path;

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
  beforeEach(inject(function ($rootScope, $controller, $q, DashboardService, $location) {
    $scope = $rootScope.$new();
    service = DashboardService;
    $location = $location;
    $controller('SplashCtrl', {
      $scope: $scope,
      DashboardService: service
    });

  }));

  describe('Method: init', function() {

    it('should have function named $scope.init()', function () {
      expect(angular.isFunction($scope.init)).toBe(true);
    });

    describe('Calls DashboardService.getSearchTerms() successfully', function() {
      beforeEach(inject (function($q) {
        var termsDeferred = $q.defer();
        termsDeferred.resolve(mockTerms);
        spyOn(service, 'getSearchTerms').and.returnValue(termsDeferred.promise);

        $scope.init();
      }));

      it('should call getSearchTerms and set to $scope.commonSearchTerms', function () {
        $scope.$digest();
        expect($scope.commonSearchTerms).toEqual(mockTerms);
      });
    });

    describe('Calls getSearchTerms returns an error', function() {
      beforeEach(inject (function() {
        spyOn(service, 'getSearchTerms').and.throwError('failed');
        $scope.init();
      }));

      xit('should call getSearchTerms and throw error', function () {
        //console.log(setTerms);
          expect(function() {
            service.getSearchTerms();
          }).toThrowError('failed');
        });
      });

  });
  //
  describe('Method: search', function() {

    it('should have function named $scope.search()', function () {
      expect(angular.isFunction($scope.search)).toBe(true);
    });

    beforeEach(inject (function($location) {
      spyOn($location, 'path').and.returnValue('/keyword/');
      $scope.search('ibuprofen');
    }));

  });

});
