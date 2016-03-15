// controller that will be called when splash page is loaded
app.controller("bidNewCtrl", function($scope, $state, $stateParams, $http, jwtHelper) {
  "use strict";
  let authTokenPresent = true;
  if (!Cookies("authToken")) {
    Cookies("originalUrl", location.pathname);
    $state.go("login");
  }

  console.log($state.params.requestId);
  $http.get(`/api/request/view/${$stateParams.requestId}`).then(res => {
    console.log("res.data:", res.data);
    let thisUser = jwtHelper.decodeToken(Cookies.get("authToken"))._id;
    res.data.bids.forEach(bid => {
      if(bid.user === thisUser){
        console.log("Bid already exists");
        $state.go("bidView", {bidId: bid._id});
        return;
      }
    });
    $scope.username = res.data.user.username;

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
