// controller that will be called when new request page is loaded
app.controller("requestSearchCtrl", function($scope, $state, $http, jwtHelper) {
  "use strict";
  console.log("requestSearchCtrl");
  let timeLeft;

  $scope.searchRequests = (page) => {

    if(!page){
      console.log("hit !page");
      $scope.currentFilter = $scope.filterText;
      console.log($scope.currentFilter);
    }
    let currentUser = jwtHelper.decodeToken(Cookies.get("authToken"))._id;
    let requestUrl = `/api/request/search?filter=${$scope.currentFilter}&user=${currentUser}`;
    if(page) {
      console.log("hit page");
      requestUrl += `&page=${page}`;
    }

    $scope.searching = true;

    $http.get(requestUrl).then((res) => {
      $scope.requests = res.data.data;
      $scope.searchMade = true;
      $scope.pages = new Array(+res.data.pages || 1);
      console.log("getting", $scope.requests);
      $scope.searching = false;
    }, (err) => {
      $scope.searching = false;
      return alert(err.data);
    });
  };






    let url = `/api/request/search/all?filter=${$scope.currentFilter}`
    $http.get(url).then((res) => {
      console.log("InitialLoadRes: ", res)
      $scope.requests = res.data.data;
      $scope.searchMade = true;
      $scope.pages = new Array(+res.data.pages || 1);
      console.log("getting", $scope.requests);
    }, (err) => {
      console.log("error")
      return alert(err.data)
    })




  $scope.getExpiration = (timestamp) => {
    let expiration = moment(timestamp).add(3, "d");
    let now = moment();
    let daysRemaining = expiration.diff(now, "day");
    let hoursRemaining = expiration.diff(now, "hour") % 24;
    let minutesRemaining = expiration.diff(now, "minute") % 60;
    let timeRemaining = "";
    let timeSet = false;
    if(daysRemaining) {
      timeRemaining += `${daysRemaining} day`;
      if(daysRemaining > 1) {
        timeRemaining += "s";
        timeLeft = timeRemaining;
      }
      timeSet = true;
    }
    if(hoursRemaining && !timeSet) {
      timeRemaining += `${hoursRemaining} hour`;
      if(hoursRemaining > 1) {
        timeRemaining += "s";
        timeLeft = timeRemaining;
      }
      timeSet = true;
    }
    if(minutesRemaining && !timeSet) {
      timeRemaining += `${minutesRemaining} minute`;
      if(minutesRemaining > 1) {
        timeRemaining += "s";
        timeLeft = timeRemaining;
      }
    }
    return timeRemaining;
  };

  $scope.showRequestDetails = (id) => {
    $http.get(`/api/request/view/${id}`).then((res) => {
      $scope.request = res.data;
      $scope.request.timeLeft = timeLeft;
      $("#requestDetailsModal").foundation("reveal", "open");
      //modal.show();
    }, (err) => {
    return alert(err.data);
    });
  };

  $scope.newBid = (requestId) => {
    $state.go("bidNew", {requestId: requestId});
  };

  console.log("Scope: ", $scope);
});
