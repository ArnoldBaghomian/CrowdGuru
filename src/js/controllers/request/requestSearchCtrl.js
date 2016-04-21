// controller that will be called when new request page is loaded
app.controller("requestSearchCtrl", function($scope, $state, $http, $timeout, jwtHelper) {
  "use strict";

  let timeLeft;

  $scope.page = 1;
  $scope.filter = {};

let requestUrl = "/api/request/search";
  if(Cookies.get("authToken")){
    let currentUser = jwtHelper.decodeToken(Cookies.get("authToken"))._id;
    if (currentUser._id) {
      requestUrl += `?user=${currentUser._id}`;
    }
  }

$scope.refreshList = () => {
  $scope.searching = true;
  $scope.pages = [];
  $scope.page = 1;
  $http.get(requestUrl).then((res) => {
    $scope.allRequests = res.data.data;
    $scope.allRequests.sort((a,b) => b.timestamp - a.timestamp);
    $scope.searching = false;
    $scope.searchMade = true;
    $scope.filterRequests();
  }, err => {
    $scope.searching = false;
    return swal(err.data);
  });
};

$scope.changePage = page => {
  let source = "allRequests";
  if($scope.filteredRequests) {
    source = "filteredRequests";
  }
  $scope.requests = $scope[source].slice(20*(page-1), 20*page);
  $scope.page = page;
  $scope.moveFooter();
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

$scope.getDate = (timestamp) => {
  return moment(timestamp).format("h:mm A ll");
};

$scope.showRequestDetails = (id) => {
  $http.get(`/api/request/view/${id}`).then((res) => {
    let requestData = res.data;
    requestData.timeLeft = timeLeft;
    $scope.$emit("UPDATE_REQUEST_MODAL", requestData);
    $scope.$emit("TOGGLE_REQUEST_MODAL");
  }, err => {
    return swal(err.data);
  });
};

$scope.filterRequests = () => {
  let title = $scope.filter.title ? $scope.filter.title.trim().toLowerCase() : "";
  let tags = $scope.filter.tags ? $scope.filter.tags.trim().replace(/,{2,}/, ",").split(",").map((val) => val.toLowerCase()) : [];

  let filteredRequests = $scope.allRequests.slice(0);

  for(let i = filteredRequests.length - 1; i >= 0; i--){
    if(title && !filteredRequests[i].title.toLowerCase().includes(title)) {
      filteredRequests.splice(i, 1);
    } else {
      for(let j = 0; j < tags.length; j++){
        if(!filteredRequests[i].tags.includes(tags[j])) {
          filteredRequests.splice(i, 1);
          j = tags.length;
        }
      }
    }
  }

  $scope.filteredRequests = filteredRequests;
  $scope.requests = filteredRequests.slice(0, 20);
  $scope.pages = new Array(Math.ceil(+$scope.filteredRequests.length/20));
  $scope.moveFooter();
};

$scope.clearFilter = () => {
  $scope.filter = {};
  $scope.page = 1;
  $scope.filterRequests();
};

$scope.moveFooter = () => {
  $timeout(() => {
    let $footer = $("#contact");
    let tablePosition = $(".aboveHeader").position().top;
    let tableHeight = $(".tablesize").height();
    if((tablePosition + tableHeight + 94) > window.innerHeight){
      $footer.css("position", "relative");
    } else {
      $footer.css("position", "fixed");
    }
  }, 0, false);
};

$scope.refreshList();
});
