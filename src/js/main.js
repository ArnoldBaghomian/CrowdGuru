var app = angular.module("crowdGuru", ["ui.router", "uiRouterStyles", "angular-md5", "angular-jwt"]);
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
      templateUrl: "./partials/bid/view.html",
      controller: "bidViewCtrl"
    })
    .state("bidNew", {
      url: "/bid/new/{requestId}",
      templateUrl: "./partials/bid/new.html",
      controller: "bidNewCtrl"
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
      url: "/users/profile?userId",
      templateUrl: "./partials/profilePage.html",
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
      data:{
        css: ["css/request/search.css"]
      },
      controller: "requestSearchCtrl"
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


app.run(function($window, $rootScope, $location) {
  $window.ga('create', 'UA-75164642-1', 'auto');
  $rootScope.$on('$stateChangeSuccess', function (event) {
    $window.ga('send', 'pageview', $location.path());
});
});
