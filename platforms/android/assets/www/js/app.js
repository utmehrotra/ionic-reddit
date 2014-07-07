// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}).service('Fetch', ['$http','$log', Fetch])
.controller('AppCntrl', ['$scope','$log', 'Fetch', AppCntrl]);

function AppCntrl($scope,$log,Fetch)
{
  $scope.posts = [];
  $scope.refresh = function()
  {
    
  Fetch.getdata($scope);
 // alert("Refreshed");
  }
 
}


function Fetch($http,$log)
{
  this.getdata = function($scope)
  {
    return $http.get('http://www.reddit.com/r/funny/hot/.json').then(function (response) {
     if (response.data.error) {
         return null;
     } else {
      //alert(response.data.children);
         console.log(response.data.data.children);
         $scope.posts = response.data.data.children;
         return response.data.data.children;
     }
 });
  }
 
}




/*
function Fetch($http,$log)
{
  this.getdata = function($scope)
  {
    $http.get("http://www.reddit.com/r/funny/hot/.json")
    .then(function(result)
    {
     // $scope.posts = result.posts;
     console.log(result.children);
      $scope.$broadcast("scroll.refreshComplete");
      return result.children;
    });
  };
}

/*.service('Fetch', ['$http','$log', Fetch])
.controller('AppCntrl', ['$scope','$log', 'Fetch', AppCntrl]);

function AppCntrl($scope,$log,Fetch)
{
  //$scope.posts = [];
  $scope.refresh = function()
  {
    
  Fetch.getdata($scope);
  alert("Refreshed");
  }
 
}

function Fetch($http,$log)
{
  this.getdata = function($scope)
  {
    $http.jsonp("http://public-api.wordpress.com/rest/v1/freshly-pressed?callback=JSON_CALLBACK")
    .success(function(result)
    {
      $scope.posts = result.posts;
      $scope.$broadcast("scroll.refreshComplete");
    });
  };
}

*/