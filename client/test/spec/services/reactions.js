'use strict';

describe('Service : reactions', function () {

  // load the controller's module
  beforeEach(module('dreApp'));

  var reactions,
    $httpBackend;

  // Initialize the service and a mock backend
  beforeEach(inject(function ($httpBackend, _reactions_) {
    reactions = _reactions_;
    $httpBackend = $httpBackend;
  }));

  describe('Method: Get Symptom Definition from Reactions API', function() {
    it('reactions.getSymptomDefinition() should be a function', function() {
      expect(angular.isFunction(reactions.reactions.getSymptomDefinition)).toBe(true);
    });

    it('should return array of items', function () {
      expect(reactions.reactions.getSymptomDefinition()).toBeDefined();
    });

    it('should return array of items for ibuprofen', function () {
      expect(reactions.reactions.getSymptomDefinition('ibuprofen')).toBeDefined();
    });
  });

  describe('Method: Post Symptom Definition to Reactions API', function() {
    it('reactions.postSymptomDefinition() should be a function', function() {
      expect(angular.isFunction(reactions.reactions.postSymptomDefinition)).toBe(true);
    });

    it('should return array of items for ibuprofen', function () {
      expect(reactions.reactions.postSymptomDefinition('ibuprofen')).toBeDefined();
    });
  });

  describe('Method: Get Commonly Searched Terms from Reactions API', function() {
    it('reactions.getSearchTerm() should be a function', function() {
      expect(angular.isFunction(reactions.reactions.getSearchTerm)).toBe(true);
    });

    it('should return array of items', function () {
      expect(reactions.reactions.getSearchTerm()).toBeDefined();
    });
  });

  describe('Method: Post Search Terms to Reactions API', function() {
    it('reactions.postSearchTerm() should be a function', function() {
      expect(angular.isFunction(reactions.reactions.postSearchTerm)).toBe(true);
    });

    it('should return array of items for ibuprofen', function () {
      expect(reactions.reactions.postSearchTerm('ibuprofen')).toBeDefined();
    });
  });

  describe('Method: Post New Symptom Definition to Reactions API', function() {
    it('reactions.postNewDefinition() should be a function', function() {
      expect(angular.isFunction(reactions.reactions.postNewDefinition)).toBe(true);
    });

    it('should return array of items for ibuprofen', function () {
      expect(reactions.reactions.postNewDefinition('ibuprofen')).toBeDefined();
    });
  });

  describe('Method: Put Definition Vote to Reactions API', function() {
    it('reactions.putDefinitionVote() should be a function', function() {
      expect(angular.isFunction(reactions.reactions.putDefinitionVote)).toBe(true);
    });

    it('should return array of items for ibuprofen', function () {
      expect(reactions.reactions.putDefinitionVote('ibuprofen', 'up', 0)).toBeDefined();
    });
  });

});
