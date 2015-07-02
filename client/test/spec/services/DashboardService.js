'use strict';

describe('Service: DashboardService', function () {

  // load the services's module
  beforeEach(module('dreApp'));

  var $scope, openFDA, DashboardService, reactions;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_openFDA_, $rootScope, _DashboardService_, _reactions_) {
    $scope = $rootScope.$new();
    openFDA = _openFDA_;
    DashboardService = _DashboardService_;
    reactions = _reactions_;
  }));

  describe('Method: Get Top Symptoms from DashboardService', function() {
    it('should return array of items', function() {
      expect(DashboardService.getSymptoms()).toBeDefined();
    });

    it('should return array of items for ibuprofen', function() {
      expect(DashboardService.getSymptoms('ibuprofen')).toBeDefined();
    });

    describe('Method: Get Symptoms from openFDA', function() {
      beforeEach(inject (function($q) {
        var mockSymptomCount = {
          config: {

          },
          data: {
            meta: {
              results: {
                limit: 1,
                skip: 0,
                total: 383402
              }
            },
            results: [
              {

              }
            ]
          },
          headers: {

          },
          status: 200,
          statusText: 'OK'
        };
        var mockSymptoms = {
          config: {

          },
          data: {
            meta: {
              results: {
                limit: 1,
                skip: 0,
                total: 383402
              }
            },
            results: [
              {
                term: 'Pain',
                count: 109
              },
              {
                term: 'Nausea',
                count: 1939
              }
            ]
          },
          headers: {

          },
          status: 200,
          statusText: 'OK'
        };
        var symptomCountDeferred = $q.defer(), symptomDeferred = $q.defer();
        symptomCountDeferred.resolve(mockSymptomCount);
        symptomDeferred.resolve(mockSymptoms);
        spyOn(openFDA.adverseEvents, 'symptomCount').and.returnValue(symptomCountDeferred.promise);
        spyOn(openFDA.adverseEvents, 'topSymptoms').and.returnValue(symptomDeferred.promise);
        DashboardService.getSymptoms('ibuprofen');
      }));

      it('should return an object', function() {
        $scope.$digest();
      });
    });

  });

  describe('Method: Get Symptom Count from DashboardService', function() {
    it('should return array of items', function() {
      expect(DashboardService.getSymptomCount()).toBeDefined();
    });

    it('should return array of items for ibuprofen', function() {
      expect(DashboardService.getSymptomCount('ibuprofen')).toBeDefined();
    });

    describe('Method: Get Symptom Count from openFDA', function() {
      beforeEach(inject (function($q) {
        var mockSymptomCount = {
          config: {

          },
          data: {
            meta: {
              results: {
                limit: 1,
                skip: 0,
                total: 383402
              }
            },
            results: [
              {

              }
            ]
          },
          headers: {

          },
          status: 200,
          statusText: 'OK'
        };
        var symptomCountDeferred = $q.defer();
        symptomCountDeferred.resolve(mockSymptomCount);
        spyOn(openFDA.adverseEvents, 'symptomCount').and.returnValue(symptomCountDeferred.promise);
        DashboardService.getSymptomCount('ibuprofen');
      }));

      it('should return an object', function() {
        $scope.$digest();
      });
    });

  });

  describe('Method: Get Top Manufacturers from DashboardService', function() {
    it('should return array of items', function() {
      expect(DashboardService.getManufacturers()).toBeDefined();
    });

    it('should return array of items for ibuprofen', function() {
      expect(DashboardService.getManufacturers('ibuprofen')).toBeDefined();
    });

    describe('Method: Get Manufacturers from openFDA', function() {
      beforeEach(inject (function($q) {
        var mockManufacturers = {
          config: {

          },
          data: {
            meta: {

            },
            results: [
              {
                term: 'GSK',
                count: 343208
              },
              {
                term: 'Merck',
                count: 39392
              }
            ]
          },
          headers: {

          },
          status: 200,
          statusText: 'OK'
        };
        var manufacturerDeferred = $q.defer();
        manufacturerDeferred.resolve(mockManufacturers);
        spyOn(openFDA.adverseEvents, 'topManufacturers').and.returnValue(manufacturerDeferred.promise);
        DashboardService.getManufacturers('ibuprofen');
      }));

      it('should return an object', function() {
        $scope.$digest();
      });
    });

  });

  describe('Method: Get Top Brands from DashboardService', function() {
    it('should return array of items', function() {
      expect(DashboardService.getBrands()).toBeDefined();
    });

    it('should return array of items for ibuprofen', function() {
      expect(DashboardService.getBrands('ibuprofen')).toBeDefined();
    });

    describe('Method: Get Brands from openFDA', function() {
      beforeEach(inject (function($q) {
        var mockBrands = {
          config: {

          },
          data: {
            meta: {

            },
            results: [
              {
                term: 'Aleve',
                count: 2234
              },
              {
                term: 'Aleve PM',
                count: 343
              }
            ]
          },
          headers: {

          },
          status: 200,
          statusText: 'OK'
        };
        var brandDeferred = $q.defer();
        brandDeferred.resolve(mockBrands);
        spyOn(openFDA.adverseEvents, 'topBrandNames').and.returnValue(brandDeferred.promise);
        DashboardService.getBrands('ibuprofen');
      }));

      it('should return an object', function() {
        $scope.$digest();
      });
});

  });

  describe('Method: Get Severity Counts from DashboardService', function() {
    it('should return array of items', function() {
      expect(DashboardService.getSeverity()).toBeDefined();
    });

    it('should return array of items for ibuprofen', function() {
      expect(DashboardService.getSeverity('ibuprofen')).toBeDefined();
    });

    describe('Method: Get Severity from openFDA', function() {
      beforeEach(inject (function($q) {
        var mockSeverity = {
          config: {

          },
          data: {
            meta: {

            },
            results: [
              {
                term: 1,
                count: 78970
              },
              {
                term: 2,
                count: 890
              },
              {
                term: 5,
                count: 1
              }
            ]
          },
          headers: {

          },
          status: 200,
          statusText: 'OK'
        };
        var severityDeferred = $q.defer();
        severityDeferred.resolve(mockSeverity);
        spyOn(openFDA.adverseEvents, 'severityCount').and.returnValue(severityDeferred.promise);
        DashboardService.getSeverity('ibuprofen');
      }));

      it('should return an object', function() {
        $scope.$digest();
      });

    });

  });

  describe('Method: Get Gender Counts from DashboardService', function() {
    it('should return array of items', function() {
      expect(DashboardService.getGenders()).toBeDefined();
    });

    it('should return array of items for ibuprofen', function() {
      expect(DashboardService.getGenders('ibuprofen')).toBeDefined();
    });

    describe('Method: Get Genders from openFDA', function() {
      beforeEach(inject (function($q) {
        var mockGenders = {
          config: {

          },
          data: {
            meta: {

            },
            results: [
              {
                term: 1,
                count: 78970
              },
              {
                term: 2,
                count: 890
              },
              {
                term: 5,
                count: 1
              }
            ]
          },
          headers: {

          },
          status: 200,
          statusText: 'OK'
        };
        var gendersDeferred = $q.defer();
        gendersDeferred.resolve(mockGenders);
        spyOn(openFDA.adverseEvents, 'genderCount').and.returnValue(gendersDeferred.promise);
        DashboardService.getGenders('ibuprofen');
      }));

      it('should return an object', function() {
        $scope.$digest();
      });

    });

  });

  describe('Method: Get Top Countries from DashboardService', function() {
    it('should return array of items', function() {
      expect(DashboardService.getCountries()).toBeDefined();
    });

    it('should return array of items for ibuprofen', function() {
      expect(DashboardService.getCountries('ibuprofen')).toBeDefined();
    });

    describe('Method: Get Countries from openFDA', function() {
      beforeEach(inject (function($q) {
        var mockCountries = {
          config: {

          },
          data: {
            meta: {

            },
            results: [
              {
                term: 'US',
                count: 990093
              },
              {
                term: 'CA',
                count: 543
              },
              {
                term: 'EN',
                count: 1324
              }
            ]
          },
          headers: {

          },
          status: 200,
          statusText: 'OK'
        };
        var countriesDeferred = $q.defer();
        countriesDeferred.resolve(mockCountries);
        spyOn(openFDA.adverseEvents, 'topCountries').and.returnValue(countriesDeferred.promise);
        DashboardService.getCountries('ibuprofen');
      }));

      it('should return an object', function() {
        $scope.$digest();
      });

    });

  });

  describe('Method: Get All Events from DashboardService', function() {
    it('should return array of items', function() {
      expect(DashboardService.getEvents()).toBeDefined();
    });

    it('should return array of items for ibuprofen', function() {
      expect(DashboardService.getEvents('ibuprofen')).toBeDefined();
    });

    describe('Method: Get Events from openFDA', function() {
      beforeEach(inject (function($q) {
        var mockEvents = {
          config: {

          },
          data: {
            meta: {

            },
            results: [
              {
                term: '20140602',
                count: 37
              },
              {
                term: '20140603',
                count: 4
              },
              {
                term: '20140604',
                count: 5
              }
            ]
          },
          headers: {

          },
          status: 200,
          statusText: 'OK'
        };
        var eventsDeferred = $q.defer();
        eventsDeferred.resolve(mockEvents);
        spyOn(openFDA.adverseEvents, 'eventCountByDate').and.returnValue(eventsDeferred.promise);
        DashboardService.getEvents('ibuprofen');
      }));

      it('should return an object', function() {
        $scope.$digest();
      });

    });

  });

  describe('Method: Get Symptom Definitions from DashboardService', function() {
    it('should return array of items', function() {
      expect(DashboardService.getSymptomDefinitions()).toBeDefined();
    });

    it('should return array of items for ibuprofen', function() {
      expect(DashboardService.getSymptomDefinitions('ibuprofen')).toBeDefined();
    });

    describe('Method: Get Symptom Defitions from openFDA', function() {
      beforeEach(inject (function($q) {
        var mockDefinitions = {
          config: {

          },
          data: {
            meta: {

            },
            data: {
            definitions: [
              {
                created_at: 343728439,
                created_by: '',
                definition: 'Test def 1',
                source: 'wordnik.com',
                votes: {
                  downs: 480,
                  ups: 93
                }
              },
              {
                created_at: 80808076,
                created_by: '',
                definition: 'Test def 2',
                source: 'wordnik.com',
                votes: {
                  downs: 32,
                  ups: 423
                }
              }
            ],
            last_updated: 34384920384,
            reaction: 'nausea'
          }
          },
          headers: {

          },
          status: 200,
          statusText: 'OK'
        };
        var definitionsDeferred = $q.defer();
        definitionsDeferred.resolve(mockDefinitions);
        spyOn(reactions.reactions, 'getSymptomDefinition').and.returnValue(definitionsDeferred.promise);
        DashboardService.getSymptomDefinitions('ibuprofen');
      }));

      it('should return an object', function() {
        $scope.$digest();
      });

    });

  });

  describe('Method: Post New Symptom Definition from DashboardService', function() {
    it('should return array of items', function() {
      expect(DashboardService.postSymptomDefinitions()).toBeDefined();
    });

    it('should return array of items for ibuprofen', function() {
      expect(DashboardService.postSymptomDefinitions('ibuprofen')).toBeDefined();
    });

    describe('Method: Post Symptom Definitions from openFDA', function() {
      beforeEach(inject (function($q) {
        var mockPostDefinitions = {
          config: {

          },
          data: {
            meta: {

            },
            data: {
            definitions: [
              {
                created_at: 343728439,
                created_by: '',
                definition: 'Test def 1',
                source: 'wordnik.com',
                votes: {
                  downs: 480,
                  ups: 93
                }
              },
              {
                created_at: 80808076,
                created_by: '',
                definition: 'Test def 2',
                source: 'wordnik.com',
                votes: {
                  downs: 32,
                  ups: 423
                }
              }
            ],
            last_updated: 34384920384,
            reaction: 'nausea'
          }
          },
          headers: {

          },
          status: 200,
          statusText: 'OK'
        };
        var postDefinitionsDeferred = $q.defer();
        postDefinitionsDeferred.resolve(mockPostDefinitions);
        spyOn(reactions.reactions, 'postSymptomDefinition').and.returnValue(postDefinitionsDeferred.promise);
        DashboardService.postSymptomDefinitions('ibuprofen');
      }));

      it('should return an object', function() {
        $scope.$digest();
      });

    });

  });

  describe('Method: Post New Definition from DashboardService', function() {
    it('should return array of items', function() {
      expect(DashboardService.postNewDefinition()).toBeDefined();
    });

    it('should return array of items for ibuprofen', function() {
      expect(DashboardService.postNewDefinition('ibuprofen')).toBeDefined();
    });

    describe('Method: Post New Definitions from openFDA', function() {
      beforeEach(inject (function($q) {
        var mockPostDefinitions = {
          config: {

          },
          data: {
            meta: {

            },
            data: {
            definitions: [
              {
                created_at: 343728439,
                created_by: '',
                definition: 'Test def 1',
                source: 'wordnik.com',
                votes: {
                  downs: 480,
                  ups: 93
                }
              },
              {
                created_at: 80808076,
                created_by: '',
                definition: 'Test def 2',
                source: 'wordnik.com',
                votes: {
                  downs: 32,
                  ups: 423
                }
              }
            ],
            last_updated: 34384920384,
            reaction: 'nausea'
          }
          },
          headers: {

          },
          status: 200,
          statusText: 'OK'
        };
        var postDefinitionsDeferred = $q.defer();
        postDefinitionsDeferred.resolve(mockPostDefinitions);
        spyOn(reactions.reactions, 'postNewDefinition').and.returnValue(postDefinitionsDeferred.promise);
        DashboardService.postNewDefinition('ibuprofen');
      }));

      it('should return an object', function() {
        $scope.$digest();
      });

    });

  });

  describe('Method: Get Most Searched Terms from DashboardService', function() {
    it('should return array of items', function() {
      expect(DashboardService.getSearchTerms()).toBeDefined();
    });

    it('should return array of items for ibuprofen', function() {
      expect(DashboardService.getSearchTerms('ibuprofen')).toBeDefined();
    });

    describe('Method: Get Top Search Terms from openFDA', function() {
      beforeEach(inject (function($q) {
        var mockSearch = {
          config: {

          },
          data: {
            meta: {

            },
            data: [
              {
                search: 'Motrin',
                count: 3920
              },
              {
                search: 'Xanax',
                count: 389
              }
            ]
          },
          headers: {

          },
          status: 200,
          statusText: 'OK'
        };
        var searchDeferred = $q.defer();
        searchDeferred.resolve(mockSearch);
        spyOn(reactions.reactions, 'getSearchTerm').and.returnValue(searchDeferred.promise);
        DashboardService.getSearchTerms('ibuprofen');
      }));

      it('should return an object', function() {
        $scope.$digest();
      });

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

    describe('Method: Post Search Term from openFDA', function() {
      beforeEach(inject (function($q) {
        var mockSearch = {
          config: {

          },
          data: {
            meta: {

            },
            data:
              {
                search: 'Motrin',
                count: 90
              }
          },
          headers: {

          },
          status: 200,
          statusText: 'OK'
        };
        var searchDeferred = $q.defer();
        searchDeferred.resolve(mockSearch);
        spyOn(reactions.reactions, 'postSearchTerm').and.returnValue(searchDeferred.promise);
        DashboardService.postSearchTerm('ibuprofen');
      }));

      it('should return an object', function() {
        $scope.$digest();
      });

    });

  });

  describe('Method: Put Definition Vote from DashboardService', function() {
    it('should return array of items', function() {
      expect(DashboardService.putDefinitionVote()).toBeDefined();
    });

    it('should return array of items for ibuprofen', function() {
      expect(DashboardService.putDefinitionVote('ibuprofen')).toBeDefined();
    });

    describe('Method: Put Definition Vote from openFDA', function() {
      beforeEach(inject (function($q) {
        var mockVote = {
          config: {

          },
          data: {
            meta: {

            },
            data: {
            definitions: [
              {
                created_at: 343728439,
                created_by: '',
                definition: 'Test def 1',
                source: 'wordnik.com',
                votes: {
                  downs: 480,
                  ups: 93
                }
              },
              {
                created_at: 80808076,
                created_by: '',
                definition: 'Test def 2',
                source: 'wordnik.com',
                votes: {
                  downs: 32,
                  ups: 423
                }
              }
            ],
            last_updated: 34384920384,
            reaction: 'nausea'
          }
          },
          headers: {

          },
          status: 200,
          statusText: 'OK'
        };
        var voteDeferred = $q.defer();
        voteDeferred.resolve(mockVote);
        spyOn(reactions.reactions, 'putDefinitionVote').and.returnValue(voteDeferred.promise);
        DashboardService.putDefinitionVote('ibuprofen');
      }));

      it('should return an object', function() {
        $scope.$digest();
      });

    });

  });

});
