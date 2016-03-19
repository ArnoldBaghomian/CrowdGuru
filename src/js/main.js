var app = angular.module("crowdGuru", ["ui.router", "uiRouterStyles", "angular-md5", "angular-jwt"]);
console.log("crowdGuru app");
// used to populate the partials as well as linking them to their controllers
app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
  .state("splash", {
    url: "/",
    templateUrl: "./partials/splashPage.html",
    data: {
      css: ["css/splash.css"]
    }
  })
  .state("bidNew", {
    url: "/bid/new/{requestId}",
    templateUrl: "./partials/bid/new.html",
    controller: "bidNewCtrl",
    data: {
      css: ["css/bid/new.css"]
    }
  })
  .state("login", {
    url: "/users/login",
    templateUrl: "./partials/users/login.html",
    data:{
      css: ["css/users/login.css"]
    },
    controller: "loginCtrl"
  })
  .state("profile", {
    url: "/users/profile",
    templateUrl: "./partials/users/profile.html",
    data:{
      css: ["css/users/profile.css"]
    },
    controller: "profileCtrl"
  })
  .state("changePassword", {
    url: "/users/password/change",
    templateUrl: "./partials/users/password/change.html",
    controller: "changePasswordCtrl",
    data:{
      css: ["css/users/password/change.css"]
    }
  })
  .state("forgotPassword", {
    url: "/users/password/forgot",
    templateUrl: "./partials/users/password/forgot.html",
    controller: "forgotPasswordCtrl"
  })
  .state("register", {
    url: "/users/register",
    templateUrl: "./partials/users/register.html",
    data:{
      css: ["css/users/register.css"]
    },
    controller: "registerCtrl"
  })

  .state("requestNew", {
      url: "/request/new",
      templateUrl: "./partials/request/new.html",
      controller: "requestNewCtrl"
    })
    .state("requestSearch", {
      url: "/request/search",
      templateUrl: "./partials/request/search.html",
      data: {
        css: ["css/request/search.css"]
      },
      controller: "requestSearchCtrl"
    })
    .state("requestView", {
      url: "/request/view/{requestId}",
      templateUrl: "./partials/request/view.html"
    });
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise("/");
});

app.config(function($provide) {
  $provide.decorator("$exceptionHandler", function($delegate) {
    return function(exception, cause) {
      $delegate(exception, cause);
      setTimeout(function() {
        throw exception;
      });
    };
  });
});

app.run(function(){
  "use strict";
  let $footer = $("footer");
  let body = document.body, html = document.documentElement;
  $(window).resize(function(){
    let height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    console.log("height", height);
    console.log("window.innerHeight - 100", window.innerHeight-100);
    if(height >= (window.innerHeight - 100) && height !== window.innerHeight){
      $footer.css("position", "relative");
    } else {
      $footer.css("position", "fixed");
    }
  });
});

app.run(function() {
  $(".top-bar-section").on("click", "li", function(e) {
    $(".clickMe").trigger("click");
  });
});

app.run(function($window, $rootScope, $location) {
  $window.ga("create", "UA-75164642-1", "auto");
  $rootScope.$on("$stateChangeSuccess", function(event) {
    $window.ga("send", "pageview", $location.path());
  });
});
