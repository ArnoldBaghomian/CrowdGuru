// controller that will be called when bid page is loaded
// var app = angular.module("crowdGuru");

app.controller("loginCtrl", function($scope, $state) {
  "use strict";
  console.log("loginCtrl");
  $scope.login = function() {
    console.log(`$scope.user:`, $scope.user);
    $.post("/users/login", $scope.user, (res) => {
      console.log(res);
      $state.go("profile");
    }).error((err) => console.log(err));
    console.log("login()");
    console.log(`E-Mail: ${$scope.user.email}`);
    console.log(`Password: ${$scope.user.password}`);
  };
});
