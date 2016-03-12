// controller that will be called when profile page is loaded
app.controller("profileCtrl", function($state, $scope, $rootScope, $stateParams, $http, jwtHelper) {
  "use strict";
  $("#requestDetailsModal").foundation("reveal", "close");
  if (!Cookies("authToken")) {
    Cookies("originalUrl", location.pathname);
    $state.go("login");
  }
  let thisUser = jwtHelper.decodeToken(Cookies.get("authToken"))._id;
  $rootScope.Req = true;

  let requestUrl = `/api/users/profile/${$stateParams.userId ?  $stateParams.userId : thisUser}`;
  $http.get(requestUrl).then((res) => {
    $scope.userProfile = res.data;
    $scope.requests = res.data.requests;
    $scope.bids = res.data.bids;
    $scope.ratings = res.data.ratings;

    console.log("RES: ", $scope);
  }, (err) => {
    return console.log(err);
  });


  $scope.showReq = function() {
    $scope.Guru = false;
    $scope.Req = true;
    $scope.guruToggle = false;
    $scope.reqToggle = true;
    $scope.showSuccessAlert = true;
    $scope.alertMessage = "ALERT you clicked requests!!";
  };

  $scope.showGuru = function() {
    $scope.Guru = true;
    $scope.Req = false;
    $scope.guruToggle = true;
    $scope.reqToggle = false;
    $scope.showSuccessAlert = true;
    $scope.alertMessage = "ALERT you clicked gurus!!";
  };

  console.log("profileCtrl");

});
