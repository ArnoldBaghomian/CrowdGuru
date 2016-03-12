// controller that will be called when profile page is loaded
app.controller("profileCtrl", function($state, $scope, $rootScope) {
  "use strict";
  $("#requestDetailsModal").foundation("reveal", "close");
  if (!Cookies("authToken")) {
    Cookies("originalUrl", location.pathname);
    $state.go("login");
  }
  $rootScope.Req = true;
  console.log("Scope: ", $scope)
/*    $scope.showReq = function() {
    $scope.Guru = false;
    $scope.Req = true;
    $scope.guruToggle = false;
    $scope.reqToggle = true;
    $scope.showSuccessAlert = true;
    $scope.alertMessage = "ALERT you clicked requests!!";
  };  */

  $scope.showGuru = function() {
    $scope.Guru = true;
    $scope.Req = false;
    $scope.guruToggle = true;
    $scope.reqToggle = false;
    $scope.showSuccessAlert = true;
    $scope.alertMessage = "ALERT you clicked gurus!!";
  };

  console.log("profileCtrl");



let requestUrl = `/api/request/search?filter=${}`;
    $.get(requestUrl, (res) => {
      $scope.requests = res.data;
        console.log("RES: ",res.data);


        console.log("get: ", res.data);
      })
      .fail((err) => console.log(err));


});
