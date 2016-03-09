// controller that will be called when new request page is loaded
app.controller('requestSearchCtrl', function($scope) {
  "use strict";
  console.log("requestSearchCtrl");
  console.log($scope.requests);
  // $scope.requests = "test";
  $scope.searchRequests = () => {
    $.get(`/api/request/search?filter=${$scope.filterText}`, (data) => {
      $scope.requests = data;
      $scope.$apply();
    })
    .fail((err) => console.log(err));
  };
});
