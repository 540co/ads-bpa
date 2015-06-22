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
    'chart.js',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/main');
    $stateProvider

      .state('main', {
        url:'/main',
        views:{
          '': { templateUrl: 'views/main.html',
                controller: 'MainCtrl'
              },
          'search@main': { templateUrl: 'views/search.html'},
          'sidebar@main': { templateUrl: 'views/sidebar.html'}
        }
      })

      .state('about', {
        url:'/about',
        templateUrl: 'views/about.html'
      });
  });


  // .config(function ($routeProvider) {
  //   $routeProvider
  //     .when('/', {
  //       templateUrl: 'views/main.html',
  //       controller: 'MainCtrl'
  //     })
  //     .when('/about', {
  //       templateUrl: 'views/about.html',
  //       controller: 'AboutCtrl'
  //     })
  //     .otherwise({
  //       redirectTo: '/'
  //     });
  // });
