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
    .state("bidSearch", {
      url: "/bid/search",
      templateUrl: "./partials/requestPage.html",
      data:{
        css: ["css/request.css"]
      }
    })
    .state("bid", {
      url: "/bid",
      templateUrl: "./partials/bidPage.html"
    })
    .state("gurubid", {
      url: "/request/new",
      templateUrl: "./partials/guruBidPage.html"
    })
    .state("register", {
      url: "/users/register",
      templateUrl: "./partials/users/register.html",
        data:{
        css: ["css/register.css"]
      },
      controller: "registerCtrl"
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
    });
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise("/");
});

// app.use("statics or something", "public")
