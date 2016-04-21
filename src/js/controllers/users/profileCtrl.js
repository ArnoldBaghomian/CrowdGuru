// controller that will be called when profile page is loaded
app.controller("profileCtrl", function($state, $scope, $rootScope, $stateParams, $http, jwtHelper, md5) {
  "use strict";
  $("#requestDetailsModal").foundation("reveal", "close");
  let thisUser;
  console.log("userId:", $stateParams.userId);
  if (!$stateParams.userId) {
    Cookies("originalUrl", location.pathname);
    $state.go("login");
    return;
  }
  if (Cookies("authToken")) {
    thisUser = jwtHelper.decodeToken(Cookies.get("authToken"))._id;
    $rootScope.Req = true;
  }

  let requestUrl = `/api/users/profile/${$stateParams.userId ?  $stateParams.userId : thisUser}`;
  $http.get(requestUrl).then((res) => {
    $scope.userProfile = res.data;
    $scope.requests = res.data.requests;
    $scope.bids = res.data.bids;
    $scope.ratings = res.data.ratings;
    $scope.aboutMe = res.data.aboutMe;
    $scope.gravitarURL = "http://www.gravatar.com/avatar/" + md5.createHash(res.data.email) + "?s=512&d=identicon";
    $rootScope.moveFooter();
  }, err => {
    return console.err(err);
  });

  $scope.showReq = function() {
    $scope.Guru = false;
    $scope.Req = true;
    $scope.guruToggle = false;
    $scope.reqToggle = true;
    $scope.showSuccessAlert = true;
    $scope.alertMessage = "ALERT you clicked requests!!";
  };

  $scope.showGuru = function() {
    $scope.Guru = true;
    $scope.Req = false;
    $scope.guruToggle = true;
    $scope.reqToggle = false;
    $scope.showSuccessAlert = true;
    $scope.alertMessage = "ALERT you clicked gurus!!";
  };

  $scope.updateAboutMe = (data) => {
    let thisUser = jwtHelper.decodeToken(Cookies.get("authToken"))._id;
    let userUrl = `/api/users/profile/${$stateParams.userId ?  $stateParams.userId : thisUser}`;
    $http.put(userUrl, {aboutMeText: $scope.newAboutMe, userId: thisUser}).then((res) => {
      $scope.aboutMe = $scope.newAboutMe;
      $scope.aboutInput = false;
    });
  };


  $scope.getTime = (timestamp) => {
    return moment(timestamp).format("h:mm a ll");
  };

  $scope.viewRequest = (reqId) => {
    $http.get(`/api/request/view/${reqId}`).then((res) => {
      let requestData = res.data;
      $scope.$emit("UPDATE_REQUEST_MODAL", requestData);
      $scope.$emit("TOGGLE_REQUEST_MODAL");
    }, (err) => {

      return alert(err.data);
    });
  };

  $scope.promptAboutMe = () => {
    $scope.aboutInput = !$scope.aboutInput;
    $scope.newAboutMe = $scope.aboutMe.slice(0);
  };
});
