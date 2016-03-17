// controller that will be called when new request page is loaded
app.controller("requestViewCtrl", function($scope, $state, $http, $stateParams) {
  "use strict";
  console.log("requestViewCtrl");
  $scope.newBid = (requestId) => {
    console.log(`newBid(${requestId})`);
    $state.go("bidNew", {requestId: requestId});
  };
  console.log("Scope: ", $scope);
});
