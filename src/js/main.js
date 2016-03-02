"use strict"

var app = angular.module('', ['ngRoute', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'partials/home.html',
      controller: 'homeCtrl'
    })

  $urlRouterProvider.otherwise('/');
});
