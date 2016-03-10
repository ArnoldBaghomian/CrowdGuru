// controller that will be called when new request page is loaded
app.controller('requestSearchCtrl', function($scope) {
  "use strict";
  console.log("requestSearchCtrl");
  $scope.searchRequests = (page) => {
    console.log(page);
    $scope.currentFilter = $scope.filterText;
    $.get(`/api/request/search?filter=${$scope.currentFilter}&page=${page}`, (res) => {
      console.log(res);
      $scope.requests = res.data;
      $scope.pages = new Array(+res.pages);

      $scope.$apply();
    })
    .fail((err) => console.log(err));
  };
});
