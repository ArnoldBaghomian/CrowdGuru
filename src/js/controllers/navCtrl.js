// controller that will be called when splash page is loaded
app.controller("navCtrl", function($scope, $state, jwtHelper) {
  "use strict";
  let authTokenPresent = true;
  if(!Cookies.get("authToken")) {
    authTokenPresent = false;
  }
  // else {
  //   let token = jwtHelper.decodeToken(Cookies.get("authToken"));
  // }
  $scope.$emit("AUTH_TOKEN", authTokenPresent);
  $scope.logout = () => {
    Cookies.expire("authToken");
    $scope.$emit("AUTH_TOKEN", false);
    $state.go("login");
  };
});
