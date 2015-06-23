'use strict';

/**
 * @ngdoc overview
 * @name dreApp
 * @description
 * # dreApp
 *
 * Main module of the application.
 */
angular
  .module('dreApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'chart.js'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/home', {
        templateUrl: 'views/splash.html',
        controller: 'SplashCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
