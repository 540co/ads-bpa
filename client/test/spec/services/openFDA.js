'use strict';

describe('Service : openFDA', function () {

  // load the controller's module
  beforeEach(module('dreApp'));

  var openFDA,
    $httpBackend;

  // Initialize the service and a mock backend
  beforeEach(inject(function ($httpBackend, _openFDA_) {
    openFDA = _openFDA_;
    $httpBackend = $httpBackend;
  }));

  describe('Method: Get Top Symptoms from openFDA', function() {
    it('openFDA.adverseEvents.topSymptoms() should be a function', function() {
      expect(angular.isFunction(openFDA.adverseEvents.topSymptoms)).toBe(true);
    });

    it('should return array of items', function () {
      expect(openFDA.adverseEvents.topSymptoms()).toBeDefined();
    });
  });

  describe('Method: Get Top Manufacturers from openFDA', function() {
    it('openFDA.adverseEvents.topManufacturers() should be a function', function() {
      expect(angular.isFunction(openFDA.adverseEvents.topManufacturers)).toBe(true);
    });

    it('should return array of items', function () {
      expect(openFDA.adverseEvents.topManufacturers()).toBeDefined();
    });
});

describe('Method: Get Top Brands from openFDA', function() {
  it('openFDA.adverseEvents.topBrandNames() should be a function', function() {
    expect(angular.isFunction(openFDA.adverseEvents.topBrandNames)).toBe(true);
  });

  it('should return array of items', function () {
    expect(openFDA.adverseEvents.topBrandNames()).toBeDefined();
  });
});

describe('Method: Get Severity Count from openFDA', function() {
  it('openFDA.adverseEvents.severityCount() should be a function', function() {
    expect(angular.isFunction(openFDA.adverseEvents.severityCount)).toBe(true);
  });

  it('should return array of items', function () {
    expect(openFDA.adverseEvents.severityCount()).toBeDefined();
  });
});

describe('Method: Get Gender Count from openFDA', function() {
  it('openFDA.adverseEvents.genderCount() should be a function', function() {
    expect(angular.isFunction(openFDA.adverseEvents.genderCount)).toBe(true);
  });

  it('should return array of items', function () {
    expect(openFDA.adverseEvents.genderCount()).toBeDefined();
  });
});

describe('Method: Get Top Countries from openFDA', function() {
  it('openFDA.adverseEvents.topCountries() should be a function', function() {
    expect(angular.isFunction(openFDA.adverseEvents.topCountries)).toBe(true);
  });

  it('should return array of items', function () {
    expect(openFDA.adverseEvents.topCountries()).toBeDefined();
  });
});

describe('Method: Get Event Count by Date from openFDA', function() {
  it('openFDA.adverseEvents.eventCountByDate() should be a function', function() {
    expect(angular.isFunction(openFDA.adverseEvents.eventCountByDate)).toBe(true);
  });

  it('should return array of items', function () {
    expect(openFDA.adverseEvents.eventCountByDate()).toBeDefined();
  });
});

});
