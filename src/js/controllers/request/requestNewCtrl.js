// controller that will be called when new request page is loaded
app.controller("requestNewCtrl", function($scope, $state, $http) {
  "use strict";

  if(!Cookies("authToken")) {
    Cookies("originalUrl", location.pathname);
    $state.go("login");
  }

  $scope.submitRequest = () => {
    let newRequest = {};
    newRequest.title = $scope.request.title.trim().replace(/ {2,}/, " ");
    newRequest.tags = $scope.request.tags.replace(/,{2,}/, ",").split(",");
    newRequest.tags = newRequest.tags.map((tag) => tag.trim().toLowerCase().replace(/ {2,}/, " "));
    newRequest.tags.forEach((tag, index) => {
      let dupeIndex = newRequest.tags.indexOf(tag, index + 1);
      while (dupeIndex !== -1) {
        newRequest.tags.splice(dupeIndex, 1);
        dupeIndex = newRequest.tags.indexOf(tag, index + 1);
      }
    });
    newRequest.desc = $scope.request.desc;
    console.log(newRequest);
    $http.post("/api/request/new", newRequest)
    .then((res) => {
      console.log("res", res);
      $state.go("requestView", {requestId: res.data._id});
    }, (err) => {
      alert(err.data);
      $state.go("login");
    });
  };
  console.log("requestNewCtrl");

  console.log('Scope: ', $scope);
});
