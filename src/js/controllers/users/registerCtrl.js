// controller that will be called when bid page is loaded
// var app = angular.module("crowdGuru");

app.controller('registerCtrl', function($scope) {
  "use strict";
  console.log("registerCtrl");
  $scope.register = function() {
    console.log("register()");
    console.log(`Username: ${$scope.username}`);
    console.log($scope.email);
    console.log($scope.pass1);
    console.log($scope.pass2);
  };
});
