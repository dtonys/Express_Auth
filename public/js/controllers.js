'use strict';

/* Controllers */

// App Control is global controller attached to <body> tag
function AppCtrl($scope, $http, $location) {
  $scope.message = '';
  //Check if we are logged in, happens on every page
  $scope.checkLogin = function(){
    $http({ method: 'GET', url: '/api/checkLogin'})
      .success(function(data, status, headers, config){
        //logged in
        if(data.loggedIn){
          $scope.message = "Logged In";
          $scope.currUser = data.userName;
          //$scope.userId = data.userId;
        }
        //logged out
        else if(!data.loggedIn){
          $scope.message = "Logged Out";
          $scope.currUser = '';
        }
        else{
          $scope.message = "AJAX error";
        }
      })
      .error(function(data, status, headers, config) {
        $scope.message = 'Error: ' + status;
      });
  }
  $scope.logout = function(){
    $http({ method: 'GET', url:'/api/logout'})
      .success(function(data, status, headers, config){
        if(data.logout){
          $scope.message = 'Logged Out';
          $scope.currUser = '';
          $location.path('/');
        }
        else if(!data.logout && data.error){
          $scope.message = data.error;
        }
        else{
          $scope.message = 'AJAX error';
        }
      })
      .error(function(data, status, headers, config){
        $scope.message = 'Error: ' + status;
      });
  }
  $scope.checkLogin();
}

//Login controller attatched to login view
function LoginCtrl($scope, $http, $location) {
  $scope.status = 'Ready for Login';
  
  $scope.$parent.checkLogin();
  
  //post login data
  $scope.login = function(){
    $http({ method: 'POST', url: 'api/login', data:
          {"name": $scope.name, "password": $scope.password }})
      .success(function(data, status, headers, config){
        if(data.login){
          $scope.status = 'Login Successful!';
          $scope.$parent.message = 'Logged In';
          $scope.$parent.currUser = data.userName;
          //$scope.userId = data.userId;
          //$location.path('/');
        }
        else if(!data.login && data.error){
          $scope.status = data.error;
        }
        else{
          $scope.status = 'AJAX error';
        }
      })
      .error(function(data, status, headers, config){
        $scope.status = 'Error: ' + status;
      });
  }
}
//LoginCtrl.$inject = [$scope];

//Register controller attatched to register view
function RegisterCtrl($scope, $http, $location) {
  $scope.status = 'Ready for Register';
  $scope.$parent.checkLogin();
  
  //post registration data
  $scope.register = function(){
    $http({ method: 'POST', url: 'api/register', data:
          {"name": $scope.name, "password": $scope.password, "confirm": $scope.confirm }})
      .success(function(data, status, headers, config){
        //on success set view vars and log in user
        if(data.register){
          $scope.status = 'Registration Successful!';
          $scope.$parent.message = 'Logged In';
          $scope.$parent.currUser = data.userName;
        }
        else if(!data.register && data.error){
          $scope.status = data.error;
        }
        else{
          $scope.status = 'AJAX error';
        }
      })
      .error(function(data, status, headers, config){
        $scope.status = 'Error: ' + status;
      });
  }
}
//RegisterCtrl.$inject = [$scope];
