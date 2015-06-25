'use strict';

/**
 * @ngdoc function
 * @name dreApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreApp
 */
angular.module('dreApp')
  .controller('MainCtrl', ['$scope', '$q', 'DashboardService', function ($scope, $q, DashboardService) {
    $scope.searchTerm;
    $scope.initDashboard = function() {
      setDashboard();
      $scope.showFilter = false;
    };

    $scope.getResults = function(keyword, filter) {
      $scope.showFilter = true;
      $scope.searchTerm = keyword;
      setDashboard(keyword);
      $scope.definitions = [];
    };


        .then(parallelLoad);

        $scope.allSymptoms = symptoms;
        _.forEach(symptoms, function(symptom) {
          return DashboardService.getSymptomDefinitions(symptom.term);
        });
      }).then(function(definition) {
        $scope.definition = definition;
      });

        $scope.allManufacturers = manufacturers;
          manufacturerNames.push(manufacturer.term);
          manufacturerCounts.push(manufacturer.count);
        });
        $scope.manufacturerCounts = manufacturerCounts;
        $scope.manufacturerNames = manufacturerNames;
      });

        $scope.allBrands = brands;
      });

        $scope.allSeverityCount = severity;
      });

        $scope.allGenderCount = genders;
      });

        $scope.allCountries = countries;
      });

        $scope.allEvents = events;
          eventDates.push(parseDate(event.time));
          eventCounts.push(event.count);
        });
        eventCounts = _.drop(eventCounts, eventCounts.length - 25);
        eventDates = _.drop(eventDates, eventDates.length - 25);
        $scope.eventCounts = [eventCounts];
        $scope.eventDates = eventDates;
      });
    }

    function parseDate(str) {
      return (D.getFullYear() == y && D.getMonth() == m && D.getDate() == d) ? m.toString() + '/' + d + '/' + y : 'invalid date';
    }




      });
  }]);
