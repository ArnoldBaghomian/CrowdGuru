// controller that will be called when new request page is loaded
app.controller('requestSearchCtrl', function($scope) {
  "use strict";
  console.log("requestSearchCtrl");
  $scope.searchRequests = (page) => {
    if(!page){
      $scope.currentFilter = $scope.filterText;
    }
    let requestUrl = `/api/request/search?filter=${$scope.currentFilter}`;
    if(page) {
      requestUrl += `&page=${page}`;
    }
    $.get(requestUrl, (res) => {
      $scope.requests = res.data;
      $scope.pages = new Array(+res.pages);

      $scope.$apply();
    })
    .fail((err) => console.log(err));
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
      }
      timeSet = true;
    }
    if(hoursRemaining && !timeSet) {
      timeRemaining += `${hoursRemaining} hour`;
      if(hoursRemaining > 1) {
        timeRemaining += "s";
      }
      timeSet = true;
    }
    if(minutesRemaining && !timeSet) {
      timeRemaining += `${minutesRemaining} minute`;
      if(minutesRemaining > 1) {
        timeRemaining += "s";
      }
    }
    return timeRemaining;
  };
});
