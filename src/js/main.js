var app = angular.module("crowdGuru", ["ui.router"]);
console.log('crowdGuru app');
// used to populate the partials as well as linking them to there controllers
app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('splash', {
      url: '/',
      templateUrl: './partials/splashPage.html'
      // controller: 'splashCtrl'
    })
    .state('request', {
      url: '/request',
      templateUrl: './partials/requestPage.html'
      // controller: 'requestCtrl'
    })
    .state('bid', {
      url: '/bid',
      templateUrl: './partials/bidPage.html'
      // controller: 'requestCtrl'
    })
    .state('gurubid', {
      url: '/gurubid',
      templateUrl: './partials/guruBidPage.html'
      // controller: 'requestCtrl'
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
