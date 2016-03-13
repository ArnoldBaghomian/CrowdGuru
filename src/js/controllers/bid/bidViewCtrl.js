// controller that will be called when splash page is loaded
app.controller("bidViewCtrl", function($scope, $state, $stateParams, $http, jwtHelper) {
  "use strict";
  if (!Cookies("authToken")) {
    Cookies("originalUrl", location.pathname);
    $state.go("login");
}

  console.log("bidViewCtrl");
});
