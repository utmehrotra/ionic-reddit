// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}).service('Fetch', ['$http', '$log', Fetch])
  .service('loadMore', ['$http', loadMore])
  .controller('AppCntrl', ['$scope', '$rootScope', '$log', 'Fetch', 'loadMore', AppCntrl]);

function AppCntrl($scope, $rootScope, $log, Fetch, loadMore) {
  $rootScope.after = "dsdhfshk";
  $scope.posts = [];
  $scope.after = '';

  $scope.refresh = function() {
    
    console.log("refreshing");
    Fetch.getdata($scope);
    //console.log($scope.loader);
  }

  $scope.load_more = function() {
    console.log("Load More");

    loadMore.getdata($scope);
    $scope.$broadcast('scroll.infiniteScrollComplete');
  };

}


function Fetch($http, $log) {
  this.getdata = function($scope) {
    console.log();
    $http.get('http://www.reddit.com/r/funny/hot/.json').then(function(response) {
      if (response.data.error) {
        return null;
      } else {
        console.log(response.data.data.children);
        $scope.posts = response.data.data.children;
        //$rootScope.after = response.data.data.after;
        $scope.$broadcast("scroll.refreshComplete");
        return response.data.data.children;
      }
    });
  }
  // return this.getdata;
}


function loadMore($http) {
  this.getdata = function($scope) {
    console.log("I am here loadmore" + $scope.after);
    $http.get('http://www.reddit.com/r/funny/hot/.json?after=' + $scope.after).then(function(response) {
      // useItems(items);
      if (response.data.error) {

        return null;
      } else {
        console.log(response.data.data.children);
        $scope.posts.push.apply($scope.posts, response.data.data.children);
        $scope.after = response.data.data.after;
        $scope.$broadcast("scroll.refreshComplete");
        $scope.$broadcast('scroll.infiniteScrollComplete');
        return response.data.data;
      }


    });

  }

}