// controller that will be called when new request page is loaded
app.controller('requestSearchCtrl', function($scope) {
  "use strict";
  console.log("requestSearchCtrl");
  $scope.searchRequests = (page) => {
    if(!page){
      $scope.currentFilter = $scope.filterText;
    }
    let requestUrl = `/api/request/search?filter=${$scope.currentFilter}`;
    if(page) {
      requestUrl += `&page=${page}`;
    }
    $.get(requestUrl, (res) => {
      $scope.requests = res.data;
      $scope.pages = new Array(+res.pages);

      $scope.$apply();
    })
    .fail((err) => console.log(err));
  };
});
