// controller that will be called when new request page is loaded
app.controller('requestViewCtrl', function($scope, $stateParams, $http) {
  "use strict";
  console.log("requestViewCtrl");

  if(!Cookies("authToken")) {
    Cookies("originalUrl", location.pathname);
    $state.go("login");
  }

  $scope.id = $stateParams.requestId;
  $http.get(`/api/request/view/${$stateParams.requestId}`).then((res) => {
    console.log("res.data:", res.data);
    $scope.request = res.data;
  }, (err) => {
    return alert(err.data);
  });

  $scope.formatTimestamp = (timestamp) => {
    return moment(timestamp).format("hh:MM a ll");
  };
});
