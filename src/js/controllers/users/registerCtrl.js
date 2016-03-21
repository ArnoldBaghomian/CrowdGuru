app.controller("registerCtrl", function($scope, $state, $http) {
  "use strict";
  console.log("registerCtrl");
  let registerState = ($state.current.name === "register");
  if(registerState && Cookies.get("authToken")) {
    $state.go("profile");
  }

  $scope.register = function(modal) {
    console.log("Register!");
    if($scope.pass1 !== $scope.pass2){
      swal("Please enter matching passwords.");
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
      swal("Something broke!");
    }

    $http.post("/api/users/register", userData).then((res) => {
        $scope.$emit("AUTH_TOKEN", true);
        if(modal){
          $(`#${modal}`).foundation("reveal", "close");
        }
        if(registerState){
          $state.go("profile");
        }
    },(err) => {
      swal(err.data);
    });
  };
});
