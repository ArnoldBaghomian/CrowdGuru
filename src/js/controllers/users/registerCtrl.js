// controller that will be called when bid page is loaded
// var app = angular.module("crowdGuru");

app.controller("registerCtrl", function($scope, $state) {
  "use strict";
  console.log("registerCtrl");
  $scope.register = function() {
    console.log("Register!");
    if($scope.pass1 !== $scope.pass2){
      alert("Please enter matching passwords.");
      $scope.pass1 = $scope.pass2 = null;
      return;
    }
    let userData = {};
    userData.username = $scope.user.username;
    userData.email = $scope.user.email;
    userData.password = $scope.user.pass1;
    console.log(`userData:`, userData);
    if(!$scope.user.username || !$scope.user.email || !$scope.user.pass1) {
      $scope.user = null;
      alert("Something broke!");
    }

    $.post("/api/users/register", userData, (res) => {
      console.log(res);
      $state.go("login");
    }).error((err) => alert(err.responseText));
  };
});
