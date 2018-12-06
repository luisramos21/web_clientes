/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var API_HOST = "/api_clientes/"
app.controller('ClientesController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
        if (typeof $routeParams.id != "undefined") {
            $scope.Title = "Actualizar Cliente";
            ajax(`${API_HOST}clientes/get/${$routeParams.id}`, "GET", {"is_edit":true}, function (json) {
                Cities(function () {
                    if (typeof json != 'undefined') {
                        console.log($(`select[name="city"]`).val())
                        for (var item in json) {
                            if (item != '') {
                                if (item != 'type_document' && item != 'city') {
                                    $(`input[name="${item}"]`).val(json[item])
                                } else {
                                    $(`select[name="${item}"]`).val(json[item])
                                }
                            }
                        }
                        
                    }
                });

            })
        } else {
            $scope.Title = "Nuevo Cliente";
            Cities();
        }
    }]);


