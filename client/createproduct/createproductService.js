
'use strict';

angular.module('ANGApp').service('createproductService', function ($http, $rootScope, $location) {


    this.createProduct = function(product){

        console.log(product);
        return $http({
            method: 'POST',
            url: 'server/ANGAPI.php',
            params: {
                product: product,
                action: 'SupportData/addNewProduct'
            }
        })
            .then(function (response) {
                    return response.data;
            });
    };
});