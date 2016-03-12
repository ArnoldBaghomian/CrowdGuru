// controller that will be called when new request page is loaded
app.controller('requestSearchCtrl', function($scope, $http) {
  "use strict";
  console.log("requestSearchCtrl");
  let timeLeft;
  $scope.searchRequests = (page) => {

    if(!page){
      console.log('hit !page');
      $scope.currentFilter = $scope.filterText;
      console.log($scope.currentFilter);
    }
    let requestUrl = `/api/request/search?filter=${$scope.currentFilter}`;
    if(page) {
      console.log('hit page');
      requestUrl += `&page=${page}`;
    }

    $http.get(requestUrl).then((res) => {
      $scope.requests = res.data.data;
      $scope.pages = new Array(+res.data.pages);
      console.log("getting", $scope.requests)
    }, (err) => {
      return alert(err.data);
    });
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
  console.log('Scope: ', $scope);
});
