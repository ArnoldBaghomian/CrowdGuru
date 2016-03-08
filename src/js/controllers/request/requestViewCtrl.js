// controller that will be called when new request page is loaded
app.controller('requestViewCtrl', function($scope, $stateParams) {
  "use strict";
  console.log("requestViewCtrl");
  $scope.id = $stateParams.requestId;
  $.get(`/api/request/view/${$stateParams.requestId}`, (data) => {
    console.log("data:", data);
    $scope.request = data;
  })
  .fail((err) => console.error(err));
});
