// controller that will be called when new request page is loaded
app.controller('requestViewCtrl', function($scope, $stateParams) {
  "use strict";
  console.log("requestViewCtrl");
  $scope.id = $stateParams.requestId;
  console.log("Params: ", $stateParams.requestId)
});
