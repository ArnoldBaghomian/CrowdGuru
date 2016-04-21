// controller that will be called when new request page is loaded
app.controller("requestViewCtrl", function($scope, $state, $http, $stateParams) {
  "use strict";
  $scope.newBid = (requestId) => {
    $state.go("bidNew", {requestId: requestId});
  };
});
