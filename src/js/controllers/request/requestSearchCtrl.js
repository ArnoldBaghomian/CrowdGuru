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

  $scope.showDescription = function(event) {
    console.log("this:", this);
    console.log("$scope: ", $scope.requests);
    this.addClassggit a
    this.trDescription = true;




    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
  };









});
