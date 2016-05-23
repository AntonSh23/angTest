
'use strict';

angular.module('ANGApp').service('productsService', function ($http, $rootScope, $location) {

    this.getAllProducts = function(){
        return $http({
            method: 'POST',
            url: 'server/ANGAPI.php',
            params: {
                action: 'SupportData/getAllProducts'
            }
        })
            .then(function (response) {
                return response;
            });
    };
});