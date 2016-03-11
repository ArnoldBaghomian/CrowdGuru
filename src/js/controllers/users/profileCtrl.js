// controller that will be called when profile page is loaded
app.controller("profileCtrl", function($state, $scope, $rootScope) {
  "use strict";
  $("#requestDetailsModal").foundation("reveal", "close");
  if (!Cookies("authToken")) {
    Cookies("originalUrl", location.pathname);
    $state.go("login");
  }
  $rootScope.Req = true;

  /*$scope.showReq = function() {
    $scope.Guru = false;
    $scope.Req = true;
    $scope.guruToggle = false;
    $scope.reqToggle = true;
  };*/

  $scope.showGuru = function() {
    $scope.Guru = true;
    $scope.Req = false;
    $scope.guruToggle = true;
    $scope.reqToggle = false;
    console.log("Guru: ", $scope.Guru);
  };

  console.log("profileCtrl");


  $scope.showReq = (page) => {
    console.log("scope: ", $scope);
    let requestUrl = `/api/request/search?filter=${$scope.currentFilter}`;

    $.get(requestUrl, (res) => { // FIXME: If this were changed to $http.get, we would not need $scope.$apply()
        $scope.requests = res.data;
        console.log(res.data);

        $scope.$apply();
        console.log("get: ", res.data);
      })
      .fail((err) => console.log(err));
  };

});
