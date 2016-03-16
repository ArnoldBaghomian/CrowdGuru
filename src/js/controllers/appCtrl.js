// controller that will be called when splash page is loaded
app.controller("appCtrl", function($scope) {
  "use strict";
  $scope.modals = {};
  let $requestViewModal = $("#requestViewModal");

  $scope.$on("AUTH_TOKEN", (event, tokenExists) => {
    $scope.loggedIn = tokenExists;
  });

  $scope.$on("UPDATE_REQUEST_MODAL", (event, requestData) => {
    $scope.modals.request = requestData;
  });
  $scope.$on("TOGGLE_REQUEST_MODAL", () => {
    if($requestViewModal.hasClass("open")){
      return $requestViewModal.foundation("reveal", "close");
    }
    $requestViewModal.foundation("reveal", "open");
  });
  console.log("appCtrl");
});
