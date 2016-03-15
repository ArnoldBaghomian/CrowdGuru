// controller that will be called when new request page is loaded
app.controller("requestSearchCtrl", function($scope, $state, $http, jwtHelper) {
  "use strict";
  console.log("requestSearchCtrl");

  let timeLeft;

  $scope.page = 1;

let requestUrl = "/api/request/search";
  if(Cookies.get("authToken")){
    let currentUser = jwtHelper.decodeToken(Cookies.get("authToken"))._id;
    if (currentUser._id) {
      requestUrl += `?user=${currentUser._id}`;
    }
  }

  $http.get(requestUrl).then((res) => {
    $scope.allRequests = res.data.data;
    $scope.allRequests.sort((a,b) => a.timestamp - b.timestamp);
    console.log("all requests:", $scope.allRequests);
    $scope.requests = $scope.allRequests.slice(0, 20);
    $scope.pages = new Array(Math.ceil(+$scope.allRequests.length/20));
    console.log("getting", $scope.allRequests);
    $scope.searching = false;
    $scope.searchMade = true;
  }, (err) => {
    $scope.searching = false;
    return alert(err.data);
  });

$scope.changePage = (page) => {
  let source = "allRequests";
  if($scope.filteredRequests) {
    source = "filteredRequests";
  }
  $scope.requests = $scope[source].slice(20*(page-1), 20*page);
};

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
    console.log(timeLeft);
    console.log($scope.request);
    $("#requestDetailsModal").foundation("reveal", "open");
    //modal.show();
  }, (err) => {
    return alert(err.data);
  });
};

$scope.newBid = (requestId) => {
  $state.go("bidNew", {requestId: requestId});
};

$scope.filterRequests = () => {
  let title = $scope.filter.title ? $scope.filter.title.trim().toLowerCase() : "";
  let tags = $scope.filter.tags ? $scope.filter.tags.trim().replace(/,{2,}/, ",").split(",").map((val) => val.toLowerCase()) : [];

  let filteredRequests = $scope.allRequests.slice(0);
  console.log(`There are ${filteredRequests.length} total requests`);
  for(let i = filteredRequests.length - 1; i >= 0; i--){
    if(title && !filteredRequests[i].title.toLowerCase().includes(title)) {
      filteredRequests.splice(i, 1);
    }
    for(let j = 0; j < tags.length; j++){
      if(!filteredRequests[i].tags.includes(tags[j])) {
        filteredRequests.splice(i, 1);
        j = tags.length;
      }
    }
  }
  console.log(`There are ${filteredRequests.length} filtered requests`);
  $scope.filteredRequests = filteredRequests;
  $scope.requests = filteredRequests.slice(0, 20);
  $scope.pages = new Array(Math.ceil(+$scope.filteredRequests.length/20));
};

console.log("Scope: ", $scope);
});
