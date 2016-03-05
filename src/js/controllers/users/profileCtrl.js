// controller that will be called when profile page is loaded
app.controller("profileCtrl", function($state) {
  "use strict";
  if(!Cookies('authToken')) {
    Cookies("originalUrl", "profile");
    $state.go("login");
  }
  console.log("profileCtrl");
});
