// controller that will be called when bid page is loaded
// var app = angular.module("crowdGuru");

app.controller("loginCtrl", function($scope, $state, $http) {
  "use strict";
  console.log("loginCtrl");
  let loginState = ($state.current.name === "login");
  if(loginState && Cookies.get("authToken")) {
    $state.go("profile");
  }

  $scope.login = function(modal) {
    console.log("MODAL:", modal);
    console.log(`$scope.user:`, $scope.user);
    let userData = {};
    userData.password = $scope.user.password;
    if($scope.user.login.includes("@")) {
      userData.email = $scope.user.login;
    }
    else {
      userData.username = $scope.user.login;
    }
    $http.post("/api/users/login", userData).then((res) => {
      $scope.$emit("AUTH_TOKEN", true);
      if(modal){
        $(`#${modal}`).foundation("reveal", "close");
      }
      if(loginState){
        location.href = (Cookies("originalUrl") || "/users/profile");
      }
      Cookies.expire("originalUrl");
    }, (err) => {
      alert(err.data);
      $scope.user.password = null;
    });
    console.log("login()");
  };
});
