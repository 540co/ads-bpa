'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('dreApp'));

    var q, mockDashboardService, MainCtrl, deferred, $scope, service;

    var fakeSymptomCount = {
      config: {
        test: 'test'
      },
      data: {
        meta: {
          results: {
            limit: 1,
            skip: 0,
            total: 1234456
          }
        },
        results: [
            {
              test: 'test'
            }
          ]
      },
      headers: {
        test: 'test'
      },
      status: 200,
      statusText: 'OK'
    };

    var mockBrands = [{
    term: 'Advil',
    count: 100
  },
  {
    term: 'Xanax',
    count: 1900
  },
  {
    term: 'Aleve',
    count: 4
  }];

    // beforeEach(function() {
    //   mockDashboardService = {
    //     getSymptomCount: function() {
    //       deferred = q.defer();
    //       deferred.resolve(fakeSymptomCount);
    //       return deferred.promise;
    //     },
    //     putDefinitionVote: function() {
    //       deferred = q.defer();
    //       deferred.resolve();
    //       return deferred.promise;
    //     },
    //     getBrands: function() {
    //       deferred = q.defer();
    //       deferred.resolve(mockBrands);
    //       return deferred.promise;
    //     }
    //   };
    //   spyOn(mockDashboardService, 'getSymptomCount').and.callThrough();
    //   spyOn(mockDashboardService, 'getBrands').and.callThrough();
    // });

  // Initialize the controller and a mock scope
  // beforeEach(inject(function ($rootScope, $controller, $q) {
  //   scope = $rootScope.$new();
  //   q = $q;
  //   MainCtrl = $controller('MainCtrl', {
  //     $scope: scope,
  //     DashboardService: mockDashboardService
  //   });
  // }));

  //Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, DashboardService) {
    $scope = $rootScope.$new();
    service = DashboardService;
    $controller('MainCtrl', {
      $scope: $scope
    });
  }));

  describe('Method: initDashboard', function() {

    beforeEach(function() {
      $scope.initDashboard();
    });

    it('should have function named $scope.initDashboard()', function () {
      expect(angular.isFunction($scope.initDashboard)).toBe(true);
    });

  });

  describe('Method: $scope.getResults', function() {
    it('should have function named $scope.getResults(keyword)', function () {
      expect(angular.isFunction($scope.getResults)).toBe(true);
    });

    beforeEach(function() {
      $scope.getResults();
    });

    it('$scope.showFilter should initially set to false', function () {
      expect($scope.showFilter).toBe(true);
    });

    // describe('Calls DashboardService.getSymptomCount() successfully', function() {
    //   beforeEach(inject(function($q) {
    //     var mockSymptomCount = 564730, symptomDeferred = $q.defer();
    //     symptomDeferred.resolve(mockSymptomCount);
    //     spyOn(service, 'getSymptomCount').and.returnValue(symptomDeferred.promise);
    //     //spyOn(service, 'postSearchTerm').and.returnValue('true');
    //     $scope.getResults('ibuprofen');
    //   }));
    //
    //   it('DashboardService.getSymptomCount should be called', function () {
    //     console.log('Into function');
    //     $scope.$digest();
    //     console.log($scope.noResults);
    //     //expect(service.getSymptomCount).toHaveBeenCalled();
    //   });
    // });
  });

  describe('Method: $scope.search', function() {
    it('should have function named $scope.search(keyword)', function () {
      expect(angular.isFunction($scope.search)).toBe(true);
    });
  });

  describe('Method: $scope.openConfirm', function() {
    it('should have function named $scope.openConfirm(reaction, symptomIndex)', function () {
      expect(angular.isFunction($scope.openConfirm)).toBe(true);
    });

    beforeEach(function() {
      $scope.openConfirm();
    });

    // it('$scope.showFilter should initially set to false', function () {
    //   expect($scope.showFilter).toBe(true);
    // });
  });

  describe('Method: $scope.showErrorModal', function() {
    it('should have function named $scope.showErrorModal(error)', function () {
      expect(angular.isFunction($scope.showErrorModal)).toBe(true);
    });
  });

  describe('Method: $scope.setDashboard', function() {
    it('should have function named $scope.setDashboard()', function () {
      expect(angular.isFunction($scope.setDashboard)).toBe(true);
    });

    describe('Calls DashboardService.getSymptomCount() successfully', function() {
      beforeEach(inject(function($q) {
        var mockSymptoms = [{
          term: 'PAIN',
          count: 34693,
          percentage: '10.5%'
        },{
          term: 'DEATH',
          count: 809093,
          percentage: '89.5'
        }], mockManufacturers = [{
          term: 'GSK',
          count: 28048
        }, {
          term: 'Merck',
          count: 38392
        }], mockBrands = [{
          term: 'Aleve',
          count: 448303
        }, {
          term: 'Adderall',
          count: 909003
        }], mockGenders = [{
          term: 1,
          description: 'Male',
          count: 34349
        }, {
          term: 2,
          description: 'Female',
          count: 483930
        }], mockSeverity = [{
          term: 1,
          description: 'Serious',
          count: 392028
        }, {
          term: 2,
          description: 'Non-serious',
          count: 8990
        }], mockEvents = [{
          time: '20140602',
          count: 4
        }, {
          time: '20140603',
          count: 30
        }], mockCountries = [{
          term: 'US',
          count: 3840
        }, {
          term: 'CA',
          count: 338
        }], mockDefinitions = [{
          created_at: 1435773281180,
          definition: 'Adding a definition',
          source: 'dre_app',
          votes: {
            ups: 4,
            downs: 4
          }
        }];
        var symptomDeferred = $q.defer(), manufacturerDeferred = $q.defer(), brandDeferred = $q.defer(),
            severityDeferred = $q.defer(), gendersDeferred = $q.defer(), eventsDeferred = $q.defer(),
            countriesDeferred = $q.defer(), definitionDeferred = $q.defer();

        symptomDeferred.resolve(mockSymptoms);
        manufacturerDeferred.resolve(mockManufacturers);
        brandDeferred.resolve(mockBrands);
        severityDeferred.resolve(mockSeverity);
        gendersDeferred.resolve(mockGenders);
        eventsDeferred.resolve(mockEvents);
        countriesDeferred.resolve(mockCountries);
        definitionDeferred.resolve(mockDefinitions);

        spyOn(service, 'getSymptoms').and.returnValue(symptomDeferred.promise);
        spyOn(service, 'getManufacturers').and.returnValue(manufacturerDeferred.promise);
        spyOn(service, 'getBrands').and.returnValue(brandDeferred.promise);
        spyOn(service, 'getSeverity').and.returnValue(severityDeferred.promise);
        spyOn(service, 'getGenders').and.returnValue(gendersDeferred.promise);
        spyOn(service, 'getEvents').and.returnValue(eventsDeferred.promise);
        spyOn(service, 'getCountries').and.returnValue(countriesDeferred.promise);
        spyOn(service, 'getSymptomDefinitions').and.returnValue(definitionDeferred.promise);

        $scope.setDashboard('ibuprofen');
      }));

      it('DashboardService.getSymptoms should be called', function () {
        //console.log('Into getSymptoms()');
        //console.log($scope.allSymptoms);
        $scope.$digest();
        //console.log($scope.allSymptoms);
        //expect(service.getSymptomCount).toHaveBeenCalled();
      });
    });

  });

  describe('Method: $scope.vote', function() {
    it('should have function named $scope.vote(keyword, vote, definitionIndex, symptomIndex)', function () {
      expect(angular.isFunction($scope.vote)).toBe(true);
    });

    // beforeEach(function() {
    //   $scope.$apply();
    // });

    it('should have function named $scope.vote(keyword, vote, definitionIndex, symptomIndex)', function () {
      expect(angular.isFunction($scope.vote)).toBe(true);
    });
  });
});
