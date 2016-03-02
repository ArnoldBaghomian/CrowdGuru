

var app = angular.module("crowdGuru", ["ui.router"]);
console.log('it changed')
// used to populate the partials as well as linking them to there controllers
app.config(function($stateProvider, $urlRouterProvider) {
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

  $urlRouterProvider.otherwise('/');
});

// app.use("statics or something", "public")
