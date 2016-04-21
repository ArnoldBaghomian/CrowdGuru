// controller that will be called when splash page is loaded
app.controller("bidNewCtrl", function($scope, $state, $stateParams, $http, jwtHelper) {
  "use strict";

  $http.get(`/api/request/view/${$stateParams.requestId}`).then(res => {
    $scope.request = res.data;
    if(Cookies.get("authToken")){
      let thisUser = jwtHelper.decodeToken(Cookies.get("authToken"))._id;
      if(res.data.user){
        $scope.username = res.data.user.username;
      }
      if(res.data.bids){
        res.data.bids.forEach(bid => {
          if(bid.user === thisUser){
            swal("Bid already exists");
            // $state.go("bidView", {bidId: bid._id}); //make this open a modal, eventually
            return;
          }
        });
      }
    }
  }, (err) => {
    return swal(err.data);
  });

  $scope.submitBid = () => {
    if(!Cookies.get("authToken")) {
      $("#userAuthModal").foundation("reveal", "open");
    } else {
      let newBid = $scope.bid;
      newBid.requestId = $stateParams.requestId;
      $http.post(`/api/bid/new`, newBid).then(res => {
        $state.go("profile");
      }, err => {
        return swal(err);
      });
    }
  };
});
