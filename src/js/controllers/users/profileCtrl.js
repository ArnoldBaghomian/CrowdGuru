// controller that will be called when profile page is loaded
app.controller("profileCtrl", function($state) {
  "use strict";
  if(!Cookies.get('authToken')) {
    $state.go("login");
  }
  console.log("profileCtrl");
});
