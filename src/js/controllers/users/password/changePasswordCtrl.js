app.controller("changePasswordCtrl", function($scope, $http, $state) {
  "use strict";

  if(!Cookies("authToken")) {
    Cookies("originalUrl", location.pathname);
    $state.go("login");
  }

  $scope.sendChangeRequest = () => {
    let passwords = $scope.passwords;
    if(!passwords.new || passwords.new != passwords.verify) {
      swal("New passwords must match");
      $scope.passwords.new = null;
      $scope.passwords.verify = null;
    }
    else {
      $http.post("/api/users/password/change", passwords)
      .then((res) => {
        swal("Password changed successfully!");
        $state.go("profile");
      }, (err) => {
        return swal(err.data);
      });
    }
  };
});
