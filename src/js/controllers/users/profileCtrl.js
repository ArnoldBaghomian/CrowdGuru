// controller that will be called when profile page is loaded
app.controller("profileCtrl", function($state, $scope, $rootScope) {
  "use strict";
  if(!Cookies("authToken")) {
    Cookies("originalUrl", location.pathname);
    $state.go("login");
  }
  $rootScope.Req = true;

  $scope.showReq = function(){
    console.log("Req: ", $scope.Req);
    $scope.Guru = false;
    $scope.Req = true;
  };

  $scope.showGuru = function(){
    console.log("Guru: ", $scope.Guru);
    $scope.Guru = true;
    $scope.Req = false;
  };

  console.log("profileCtrl");
});
