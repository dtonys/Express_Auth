'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/login', {templateUrl: 'partials/login', controller: LoginCtrl});
    $routeProvider.when('/register', {templateUrl: 'partials/register', controller: RegisterCtrl});
    //$routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }]);