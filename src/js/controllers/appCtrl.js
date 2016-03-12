// controller that will be called when splash page is loaded
app.controller("appCtrl", function($scope) {
  "use strict";
  $scope.$on("AUTH_TOKEN", (event, tokenExists) => {
    $scope.loggedIn = tokenExists;
  });
  console.log("appCtrl");
});
