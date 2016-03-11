app.controller("changePasswordCtrl", function($scope, $http, $state) {
  "use strict";

  $scope.sendChangeRequest = () => {
    let passwords = $scope.passwords;
    if(!passwords.new || passwords.new != passwords.verify) {
      alert("New passwords must match");
      $scope.passwords.new = null;
      $scope.passwords.verify = null;
    }
    else {
      $http.post("/api/users/password/change", passwords)
      .then((res) => {
        alert("Password changed successfully!");
        $state.go("profile");
      }, (err) => {
        return alert(err.data);
      });
    }
  };

  console.log("changePasswordCtrl");
});
