// controller that will be called when splash page is loaded
app.controller("bidNewCtrl", function($scope, $state, $stateParams, $http, jwtHelper) {
  "use strict";

  console.log($state.params.requestId);
  $http.get(`/api/request/view/${$stateParams.requestId}`).then(res => {
    console.log("res.data:", res.data);
    $scope.request = res.data;
    if(Cookies.get("authToken")){
      let thisUser = jwtHelper.decodeToken(Cookies.get("authToken"))._id;
      if(res.data.user){
        $scope.username = res.data.user.username;
      }
      if(res.data.bids){
        res.data.bids.forEach(bid => {
          if(bid.user === thisUser){
            console.log("Bid already exists");
            $scope.alertMessage = "Bid Already exists";
            $scope.sendEm = "Click alert box back";
            $scope.showInfoAlert = true;

            // $state.go("bidView", {bidId: bid._id}); //make this open a modal, eventually
            return;
          }
        });
      }
    }
  }, (err) => {
    return alert(err.data);
  });

  $scope.submitBid = () => {
    if(!Cookies.get("authToken")) {
      $("#userAuthModal").foundation("reveal", "open");
    } else {
      let newBid = $scope.bid;
      newBid.requestId = $stateParams.requestId;
      $http.post(`/api/bid/new`, newBid).then(res => {
        console.log(res);
        $state.go("profile");
      }, err => {
        $scope.warnMessage = "ERROR";
        $scope.warnData = err.data;
        $scope.showInfoAlert = true;
        return;
      });
    }
  };

  console.log("bidNewCtrl");
});
