'use strict';

describe('Service: DashboardService', function () {

  // load the services's module
  beforeEach(module('dreApp'));

  var DashboardService,
    httpBackend, $q, $timeout, $rootScope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_DashboardService_, $httpBackend, _$q_, _$timeout_, _$rootScope_) {
    DashboardService = _DashboardService_;
    httpBackend = $httpBackend;
    $q = _$q_;
    $timeout = _$timeout_;
    $rootScope = _$rootScope_;
  }));

  it('Demonstrates async testing', function(done) {
    var deferred = $q.defer();

    $timeout(function() {
      deferred.resolve('I told you I would come!');
    }, 1000);

    deferred.promise.then(function(value) {
      expect(value).toBe('I told you I would come!');
    })
    .finally(done);

    $timeout.flush();
  });

  describe('Method: Get Top Symptoms from DashboardService', function() {
    it('should return array of items', function() {
      expect(DashboardService.getSymptoms()).toBeDefined();
    });

    it('should return array of items for ibuprofen', function() {
      expect(DashboardService.getSymptoms('ibuprofen')).toBeDefined();
    });

    beforeEach(inject (function($q) {
      var termsDeferred = $q.defer();
      termsDeferred.resolve('ibuprofen');
      spyOn(DashboardService, 'getSymptoms').and.returnValue(termsDeferred.promise);
    }));

  });

  describe('Method: Get Symptom Count from DashboardService', function() {
    it('should return array of items', function() {
      expect(DashboardService.getSymptomCount()).toBeDefined();
    });

    it('should return array of items for ibuprofen', function() {
      expect(DashboardService.getSymptomCount('ibuprofen')).toBeDefined();
    });

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
    var termsDeferred;
    beforeEach(inject (function($q) {
      termsDeferred = $q.defer();
      termsDeferred.resolve(fakeSymptomCount);
      //spyOn(DashboardService, 'getSymptomCount').and.returnValue(termsDeferred.promise);
      spyOn(DashboardService, 'getSymptomCount').and.returnValue(termsDeferred.promise);
      //$rootScope.$apply();
      DashboardService.getSymptomCount('ibuprofen');
    }));

    it('should return an object', function() {
      console.log(termsDeferred.promise);
      expect(DashboardService.getSymptomCount).toHaveBeenCalled();
    });

  });

  describe('Method: Get Top Manufacturers from DashboardService', function() {
    it('should return array of items', function() {
      expect(DashboardService.getManufacturers()).toBeDefined();
    });

    it('should return array of items for ibuprofen', function() {
      expect(DashboardService.getManufacturers('ibuprofen')).toBeDefined();
    });
  });

  describe('Method: Get Top Brands from DashboardService', function() {
    it('should return array of items', function() {
      expect(DashboardService.getBrands()).toBeDefined();
    });

    it('should return array of items for ibuprofen', function() {
      expect(DashboardService.getBrands('ibuprofen')).toBeDefined();
    });
  });

  describe('Method: Get Severity Counts from DashboardService', function() {
    it('should return array of items', function() {
      expect(DashboardService.getSeverity()).toBeDefined();
    });

    it('should return array of items for ibuprofen', function() {
      expect(DashboardService.getSeverity('ibuprofen')).toBeDefined();
    });
  });

  describe('Method: Get Gender Counts from DashboardService', function() {
    it('should return array of items', function() {
      expect(DashboardService.getGenders()).toBeDefined();
    });

    it('should return array of items for ibuprofen', function() {
      expect(DashboardService.getGenders('ibuprofen')).toBeDefined();
    });
  });

  describe('Method: Get Top Countries from DashboardService', function() {
    it('should return array of items', function() {
      expect(DashboardService.getCountries()).toBeDefined();
    });

    it('should return array of items for ibuprofen', function() {
      expect(DashboardService.getCountries('ibuprofen')).toBeDefined();
    });
  });

  describe('Method: Get All Events from DashboardService', function() {
    it('should return array of items', function() {
      expect(DashboardService.getEvents()).toBeDefined();
    });

    it('should return array of items for ibuprofen', function() {
      expect(DashboardService.getEvents('ibuprofen')).toBeDefined();
    });
  });

  describe('Method: Get Symptom Definitions from DashboardService', function() {
    it('should return array of items', function() {
      expect(DashboardService.getSymptomDefinitions()).toBeDefined();
    });

    it('should return array of items for ibuprofen', function() {
      expect(DashboardService.getSymptomDefinitions('ibuprofen')).toBeDefined();
    });
  });

  describe('Method: Post New Symptom Definition from DashboardService', function() {
    it('should return array of items', function() {
      expect(DashboardService.postSymptomDefinitions()).toBeDefined();
    });

    it('should return array of items for ibuprofen', function() {
      expect(DashboardService.postSymptomDefinitions('ibuprofen')).toBeDefined();
    });
  });

  describe('Method: Post New Definition from DashboardService', function() {
    it('should return array of items', function() {
      expect(DashboardService.postNewDefinition()).toBeDefined();
    });

    it('should return array of items for ibuprofen', function() {
      expect(DashboardService.postNewDefinition('ibuprofen')).toBeDefined();
    });
  });

  describe('Method: Get Most Searched Terms from DashboardService', function() {
    it('should return array of items', function() {
      expect(DashboardService.getSearchTerms()).toBeDefined();
    });

    it('should return array of items for ibuprofen', function() {
      expect(DashboardService.getSearchTerms('ibuprofen')).toBeDefined();
    });
  });

  describe('Method: Get Most Searched Terms from DashboardService', function() {
    it('should return array of items', function() {
      expect(DashboardService.getSearchTerms()).toBeDefined();
    });

    it('should return array of items for ibuprofen', function() {
      expect(DashboardService.getSearchTerms('ibuprofen')).toBeDefined();
    });
  });

  describe('Method: Post Searched Term from DashboardService', function() {
    it('should return array of items', function() {
      expect(DashboardService.postSearchTerm()).toBeDefined();
    });

    it('should return array of items for ibuprofen', function() {
      expect(DashboardService.postSearchTerm('ibuprofen')).toBeDefined();
    });
  });

  describe('Method: Put Definition Vote from DashboardService', function() {
    it('should return array of items', function() {
      expect(DashboardService.putDefinitionVote()).toBeDefined();
    });

    it('should return array of items for ibuprofen', function() {
      expect(DashboardService.putDefinitionVote('ibuprofen')).toBeDefined();
    });
  });

});
