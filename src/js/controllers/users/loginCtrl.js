// controller that will be called when bid page is loaded
// var app = angular.module("crowdGuru");

app.controller('loginCtrl', function($scope) {
  "use strict";
  console.log("loginCtrl");
  $scope.login = function() {
    console.log("login()");
    console.log(`E-Mail: ${$scope.email}`);
    console.log(`Password: ${$scope.password}`);
  };
});
