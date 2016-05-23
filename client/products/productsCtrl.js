
'use strict';

angular.module('ANGApp').controller('productsCtrl', function ($scope, $rootScope, productsService) {

    $scope.products = {};

    $scope.getAllProducts = function(){
        productsService.getAllProducts().then(function(response){
            $scope.products = response.data;
        });
    };
});