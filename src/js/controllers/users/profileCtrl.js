// controller that will be called when profile page is loaded
app.controller("profileCtrl", function($state, $scope, $rootScope) {
  "use strict";

  if(!Cookies("authToken")) {
    Cookies("originalUrl", location.pathname);
    $state.go("login");
  }
  $rootScope.Req = true;

  $scope.showReq = function(){
    $scope.Guru = false;
    $scope.Req = true;
    $scope.guruToggle = false;
    $scope.reqToggle = true;
    console.log("Req: ", $scope.Req);
    console.log("reqToggle: ", $scope.reqToggle);
    console.log("guruToggle: ", $scope.guruToggle);
  };

  $scope.showGuru = function(){
    $scope.Guru = true;
    $scope.Req = false;
    $scope.guruToggle = true;
    $scope.reqToggle = false;
    console.log("Guru: ", $scope.Guru);
  };

  console.log("profileCtrl");
});
