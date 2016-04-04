'use strict';
var app = angular.module('macip', [require('angular-route'), 'angularUtils.directives.dirPagination']);

app.config(function($routeProvider){
  $routeProvider.when("/", {redirectTo: '/rede'})
  .when("/rede", {
    templateUrl: "views/rede.html",
    controller:  "redeController",
    access: {requiredLogin: false}
  }).when("/maquinas", {
    templateUrl: "views/maquinas.html",
    controller: "maquinaController",
    access: {requiredLogin: false}
  });
});
