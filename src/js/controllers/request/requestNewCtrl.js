// controller that will be called when new request page is loaded
app.controller("requestNewCtrl", function($scope, $state, $http, $stateParams) {
  "use strict";

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
    if(!Cookies.get("authToken")) {
      $("#userAuthModal").foundation("reveal", "open");
    } else {
      $http.post("/api/request/new", newRequest)
      .then((res) => {
        console.log("res", res);
        $http.get(`/api/request/view/${res.data._id}`).then((res) => {
          console.log("res.data:", res.data);
          $scope.request = res.data;
          swal("Success");
          state.go("home");
        }, (err) => {
          return swal("Error: ", err.data);
        });
      }, (err) => {
        swal(err.data);
        $state.go("login");
      });
    }
  };
  console.log("requestNewCtrl");

  console.log("Scope: ", $scope);
});
