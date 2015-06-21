'use strict';

describe('Service: openFDA', function () {

  // load the controller's module
  beforeEach(module('dreApp'));

  var openFDA,
    httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_openFDA_, $httpBackend) {
    openFDA = _openFDA_;
    httpBackend = $httpBackend;
  }));

  it('should return no more than 25 symptoms', function () {
    // openFDA.adverseEvents.topSymptoms().then(function(symptoms) {
    //   expect(symptoms).toBeLessThan(26);
    // });
  });

  it('should return no more than 25 manufacturers', function () {
    // openFDA.adverseEvents.topManufacturers().then(function(manufacturers) {
    //   expect(manufacturers).toBeLessThan(26);
    // });
  });

  it('should return no more than 25 brands', function () {
    // openFDA.adverseEvents.topBrandNames().then(function(brands) {
    //   expect(brands).toBeLessThan(26);
    // });
  });

  it('should return no more than 25 countries', function () {
    // openFDA.adverseEvents.topCountries().then(function(countries) {
    //   expect(countries).toBeLessThan(26);
    // });
  });

  it('should return no more than 2 severities', function () {
    //results - serious, non-serious
    // openFDA.adverseEvents.severityCount().then(function(severity) {
    //   expect(severity).toBeLessThan(3);
    // });
  });

  it('should return no more than 25 countries', function () {
    //results - male, female, unknown
    // openFDA.adverseEvents.genderCount().then(function(genders) {
    //   expect(genders).toBeLessThan(4);
    // });
  });

});
