/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var app = angular.module("app", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
            .when("/", {
                templateUrl: "views/index.html"
            })
            .when("/clientes", {
                templateUrl: "views/clientes/list.html"
            })
            .when("/cliente/", {
                templateUrl: "views/clientes/new.html",
                controller: 'ClientesController'
            })
            .when("/cliente/:id", {
                templateUrl: "views/clientes/new.html",
                controller: 'ClientesController'
            }).otherwise({
        redirectTo: '/'
    });
});