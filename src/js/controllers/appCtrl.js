// controller that will be called when splash page is loaded
app.controller("appCtrl", function($scope, $rootScope, $timeout) {
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

  $rootScope.moveFooter = () => {
    $timeout(() => {
      let $footer = $("footer");
      let body = document.body, html = document.documentElement;
      let height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      if(height >= (window.innerHeight - 100) && height !== window.innerHeight){
        $footer.css("position", "relative");
      } else {
        $footer.css("position", "fixed");
      }
    }, 0, false);
  };

  $rootScope.$on("$stateChangeSuccess", () => {
    $rootScope.moveFooter();
  });

  console.log("appCtrl");
});
