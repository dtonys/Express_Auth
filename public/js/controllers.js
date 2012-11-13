'use strict';

/* Controllers */

function AppCtrl($scope, $http) {
  /*$http({method: 'GET', url: '/api/name'}).
  success(function(data, status, headers, config) {
    $scope.name = data.name;
  }).
  error(function(data, status, headers, config) {
    $scope.name = 'Error!'
  });*/
  //Check if we are logged in
  $http({ method: 'GET', url: '/api/checkLogin'})
    .success(function(data, status, headers, config){
      if(data.msg === 'True'){
        $scope.message = 'Thanks for being logged in';
      }
      else if(data.msg === 'False'){
        $scope.message = 'Please log in or register';
      }
    })
    .error(function(data, status, headers, config) {
      $scope.name = 'Error!'
    });
}

function LoginCtrl($scope, $http, $location) {
  $scope.prompt = 'Fill in the form to login';
  console.log($scope.name);
  console.log($scope.password);
  
  //post login data
  $scope.login = function(){
    $http({ method: 'POST', url: 'api/login', data:
          {"name": $scope.name, "password": $scope.password }})
      .success(function(data, status, headers, config){
        console.log(data);
        //$location.path('/login');
      })
      .error(function(data, status, headers, config){
        $scope.prompt = 'Error';
      });
  }
  $scope.log = function(){
    console.log($scope.name);
    console.log($scope.password);
  }
}
//LoginCtrl.$inject = [$scope];


function RegisterCtrl($scope, $http, $location) {
  $scope.prompt = 'Fill in the form to register';
  
  //post registration data
  $scope.register = function(){
    $http({ method: 'POST', url: 'api/register', data:
          {"name": $scope.name, "password": $scope.password, "confirm": $scope.confirm }})
      .success(function(data, status, headers, config){
        console.log(data.msg);
      })
      .error(function(data, status, headers, config){
        $scope.prompt = 'Error';
      });
  }
}
//RegisterCtrl.$inject = [$scope];
