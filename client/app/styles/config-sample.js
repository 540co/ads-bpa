'use strict';

/**
 * @ngdoc function
 * @name dreApp.constant:config
 * @description
 * # config
 * config file of the dreApp
 */
angular.module('dreApp')
  .constant('config', {
    'apiKey': '<api key from open.fda.gov>',
    'reactionUrl': 'https://localhost:3000/api/'
  });
