var app = angular.module("crowdGuru", ["ui.router", "uiRouterStyles"]);
console.log("crowdGuru app");
// used to populate the partials as well as linking them to there controllers
app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state("splash", {
      url: "/",
      templateUrl: "./partials/splashPage.html",
      data: {
        css: ["css/splash.css"]
      }
    })
    .state("bidView", {
      url: "/bid/view/{bidId}",
      templateUrl: "./partials/bid/view.html"
    })
    .state("login", {
      url: "/users/login",
      templateUrl: "./partials/users/login.html",
       data:{
        css: ["css/login.css"]
      },
      controller: "loginCtrl"
    })
    .state("profile", {
      url: "/users/profile",
      templateUrl: "./partials/profilePage.html",
      controller: "profileCtrl"
    })
    .state("register", {
      url: "/users/register",
      templateUrl: "./partials/users/register.html",
        data:{
        css: ["css/register.css"]
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
      data:{
        css: ["css/request.css"]
      }
    })
    .state("requestView", {
      url: "/request/view/{requestId}",
      templateUrl: "./partials/request/view.html",
      controller: "requestViewCtrl"
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
