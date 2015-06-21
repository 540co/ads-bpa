'use strict';

describe('Service: DashboardService', function () {

  // load the services's module
  beforeEach(module('dreApp'));

  var DashboardService,
    httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_DashboardService_, $httpBackend) {
    DashboardService = _DashboardService_;
    httpBackend = $httpBackend;
  }));

  describe('Method: Get Top Symptoms from DashboardService', function() {
    it('should return array of items ', function() {
      expect(DashboardService.getSymptoms()).toBeDefined();
    });
  });

  describe('Method: Get Top Manufacturers from DashboardService', function() {
    it('should return array of items ', function() {
      expect(DashboardService.getManufacturers()).toBeDefined();
    });
  });

  describe('Method: Get Top Brands from DashboardService', function() {
    it('should return array of items ', function() {
      expect(DashboardService.getBrands()).toBeDefined();
    });
  });

  describe('Method: Get Severity Counts from DashboardService', function() {
    it('should return array of items ', function() {
      expect(DashboardService.getSeverity()).toBeDefined();
    });
  });

  describe('Method: Get Gender Counts from DashboardService', function() {
    it('should return array of items ', function() {
      expect(DashboardService.getGenders()).toBeDefined();
    });
  });

  describe('Method: Get Top Countries from DashboardService', function() {
    it('should return array of items ', function() {
      expect(DashboardService.getCountries()).toBeDefined();
    });
  });
  describe('Method: Get All Events from DashboardService', function() {
    it('should return array of items ', function() {
      expect(DashboardService.getEvents()).toBeDefined();
    });
  });

});
