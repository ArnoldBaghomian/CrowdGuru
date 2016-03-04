var app = angular.module("crowdGuru", ["ui.router", "uiRouterStyles"]);
console.log('crowdGuru app');
// used to populate the partials as well as linking them to there controllers
app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('splash', {
      url: '/',
      templateUrl: './partials/splashPage.html',
      data: {
        css: ['css/splash.css']
      }
      // controller: 'splashCtrl'
    })
    .state('request', {
      url: '/request',
      templateUrl: './partials/requestPage.html',
      data:{
        css: ['css/request.css']
      }
      // controller: 'requestCtrl'
    })
    .state('bid', {
      url: '/bid',
      templateUrl: './partials/bidPage.html'
      // controller: 'requestCtrl'
    })
    .state('gurubid', {
      url: '/requestguru',
      templateUrl: './partials/guruBidPage.html'
      // controller: 'requestCtrl'
    })
    .state('register', {
      url: "/users/register",
      templateUrl: './partials/users/register.html',
      controller: 'registerCtrl'
    })
    .state('login', {
      url: '/users/login',
      templateUrl: './partials/users/login.html',
      controller: 'loginCtrl'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: './partials/profilePage.html'
      // controller: 'requestCtrl'
    });
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
});

// app.use("statics or something", "public")
