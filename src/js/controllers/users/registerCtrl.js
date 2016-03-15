app.controller("registerCtrl", function($scope, $state, $http) {
  "use strict";
  console.log("registerCtrl");

  if($state.current.name === "login" && Cookies.get("authToken")) {
    $state.go("profile");
  }

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

    $http.post("/api/users/register", userData).then((res) => {
      console.log(res);
      $state.go("login");
    },(err) => {
      alert(err.data);
    });
  };
});
