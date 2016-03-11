// controller that will be called when new request page is loaded
app.controller('requestViewCtrl', function($scope, $stateParams) {
  "use strict";
  console.log("requestViewCtrl");
  $scope.id = $stateParams.requestId;
  $.get(`/api/request/view/${$stateParams.requestId}`, (data) => {
    console.log("data:", data);
    $scope.request = data;
    $scope.$apply();
  })
  .fail((err) => console.error(err));

  $scope.formatTimestamp = (timestamp) => {
    return moment(timestamp).format("hh:MM a ll")
  }
});
