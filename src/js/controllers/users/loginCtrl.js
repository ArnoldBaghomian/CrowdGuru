// controller that will be called when bid page is loaded
// var app = angular.module("crowdGuru");

app.controller("loginCtrl", function($scope, $state) {
  "use strict";
  console.log("loginCtrl");
  $scope.login = function() {
    console.log(`$scope.user:`, $scope.user);
    let userData = {};
    userData.password = $scope.user.password;
    if($scope.user.login.includes("@")) {
      userData.email = $scope.user.login;
    }
    else {
      userData.username = $scope.user.login;
    }
    $.post("/users/login", userData, (res) => {
      location.href = (Cookies("originalUrl") || "/users/profile");
      Cookies.expire("originalUrl");
    }).error((err) => {
      alert(err.responseText);
      $("[ng-model='user.password']").val(null);
      // $scope.user.password = null; FIXME this is not staying properly bound
    });
    console.log("login()");
  };
});
