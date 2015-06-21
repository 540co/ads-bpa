'use strict';

angular
    .module('dreApp')
    .factory('openFDA', ['$http', '$q', 'config', function ($http, $q, config) {

        var apiKey = 'api_key=' + config.apiKey;

        if (!window.console) console = {
            log: function () {}
        };

        var requestParams = function (custom) {
            var commonParams = {
                method: 'GET',
                responseType: 'json',
                cache: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            return angular.extend(commonParams, custom);
        };

        var catalogEndpoint = function (catalog, resource) {
            var openFDAApiUrl = 'https://api.fda.gov/';

            var catalogs = {
                drugAdverseEvent: 'drug/event.json?' + apiKey,
                drugLabel: 'drug/label.json?' + apiKey
            };
            return openFDAApiUrl + catalogs[catalog] + resource;
        };

        var adverseEvents = {
            topSymptoms: function (drugKeyword) {
                var url = '&count=patient.reaction.reactionmeddrapt.exact&limit=25';
                if (drugKeyword)
                    url = '&search=(patient.drug.openfda.brand_name:' + encodeURIComponent(drugKeyword) + '+patient.drug.openfda.substance_name:' + encodeURIComponent(drugKeyword) + ')' + url;

                return $http(requestParams({
                    url: catalogEndpoint('drugAdverseEvent', url),
                }));
            },
            topManufacturers: function (drugKeyword) {
                var url = '&count=patient.drug.openfda.manufacturer_name.exact&limit=25';
                if (drugKeyword)
                    url = '&search=(patient.drug.openfda.brand_name:' + encodeURIComponent(drugKeyword) + '+patient.drug.openfda.substance_name:' + encodeURIComponent(drugKeyword) + ')' + url;

                return $http(requestParams({
                    url: catalogEndpoint('drugAdverseEvent', url),
                }));
            },
            topBrandNames: function (drugKeyword) {
                var url = '&count=patient.drug.openfda.brand_name.exact&limit=25';
                if (drugKeyword)
                    url = '&search=(patient.drug.openfda.brand_name:' + encodeURIComponent(drugKeyword) + '+patient.drug.openfda.substance_name:' + encodeURIComponent(drugKeyword) + ')' + url;

                return $http(requestParams({
                    url: catalogEndpoint('drugAdverseEvent', url),
                }));
            },
            severityCount: function (drugKeyword) {
                var url = '&count=serious&limit=25';
                if (drugKeyword)
                    url = '&search=(patient.drug.openfda.brand_name:' + encodeURIComponent(drugKeyword) + '+patient.drug.openfda.substance_name:' + encodeURIComponent(drugKeyword) + ')' + url;

                return $http(requestParams({
                        url: catalogEndpoint('drugAdverseEvent', url),
                    }))
                    .then(function (res) {
                        //TODO: convert 1  = Serious Event, 2 = Not Serious
                        //TODO: move to Service
                        _.forEach(res.data.results, function (record) {
                            switch (record.term) {
                            case 1:
                                record.term = "Serious";
                                break;
                            case 2:
                                record.term = "Non-Serious";
                                break;
                            default:
                                record.term = "Unknown";
                                break;
                            }
                        });
                        return res;
                    });
            },
            genderCount: function (drugKeyword) {
                var url = '&count=patient.patientsex&limit=25';
                if (drugKeyword)
                    url = '&search=(patient.drug.openfda.brand_name:' + encodeURIComponent(drugKeyword) + '+patient.drug.openfda.substance_name:' + encodeURIComponent(drugKeyword) + ')' + url;

                return $http(requestParams({
                        url: catalogEndpoint('drugAdverseEvent', url),
                    }))
                    .then(function (res) {
                        //TODO: convert 1  = Serious Event, 2 = Not Serious
                        //TODO: move to Service
                        _.forEach(res.data.results, function (record) {
                            switch (record.term) {
                            case 1:
                                record.term = "Male";
                                break;
                            case 2:
                                record.term = "Female";
                                break;
                            default:
                                record.term = "Unknown";
                                break;
                            }
                        });
                        return res;
                    });
            },
            topCountries: function (drugKeyword) {
                var url = '&count=occurcountry.exact&limit=25';
                if (drugKeyword)
                    url = '&search=(patient.drug.openfda.brand_name:' + encodeURIComponent(drugKeyword) + '+patient.drug.openfda.substance_name:' + encodeURIComponent(drugKeyword) + ')' + url;

                    return $http(requestParams({
                        url: catalogEndpoint('drugAdverseEvent', url),
                    }));
            }
        };

        return {
            adverseEvents: adverseEvents
        };
  }]);
