app.controller("forgotPasswordCtrl", function($scope, $http, $state) {
  "use strict";

  $scope.sendResetRequest = () => {
    $http.post("/api/users/password/forgot", {login: $scope.login})
    .then((res) => {
      alert("Please check your e-mail for further instructions.\n\nIf you do not receive an e-mail within 10 minutes, please check your spam filter.");
      $state.go("login");
    }, (err) => {
      return alert(err.data);
    });
  };

  console.log("forgotPasswordCtrl");
});
