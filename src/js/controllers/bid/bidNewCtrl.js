// controller that will be called when splash page is loaded
app.controller("bidNewCtrl", function($scope, $state, $stateParams, $http) {
  "use strict";
  let authTokenPresent = true;
  if (!Cookies("authToken")) {
    Cookies("originalUrl", location.pathname);
    $state.go("login");
  }

  console.log($state.params.requestId);
  $http.get(`/api/request/view/${$stateParams.requestId}`).then(res => {
    console.log("res.data:", res.data);
    $scope.request = res.data;
  }, (err) => {
    return alert(err.data);
  });

  $scope.submitBid = () => {
    let newBid = $scope.bid;
    newBid.requestId = $stateParams.requestId;
    $http.post(`/api/bid/new`, newBid).then(res => {
      console.log(res);
      $state.go("profile");
    }, err => {
      return alert(err.data);
    });
  };

  console.log("bidNewCtrl");
});
