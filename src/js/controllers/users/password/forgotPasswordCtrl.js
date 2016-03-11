app.controller("forgotPasswordCtrl", function($scope, $http) {
  "use strict";

  $scope.sendResetRequest = () => {
    $http.post("/api/users/password/forgot", {login: $scope.login})
    .then((res) => {
      alert("Please check your e-mail for further instructions.\n\nIf you do not receive an e-mail within 10 minutes, please check your spam filter.");
    }, (err) => {
      return alert(err);
    })
  }

  console.log("forgotPasswordCtrl");
});
