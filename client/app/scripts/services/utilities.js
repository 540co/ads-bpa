'use strict';

angular
  .module('dreApp')
  .factory('Utilities', function() {

    var errorResolver = function(err, status, headers, config) {
      return err;
    };

    return {
      errorResolver: errorResolver
    };
  });
