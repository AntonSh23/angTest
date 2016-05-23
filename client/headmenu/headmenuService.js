'use strict';

angular.module('ANGApp').service('headmenuService', function ($http, $rootScope) {


    this.logout = function () {
        return $http({
            method: 'POST',
            url: 'server/ANGAPI.php',
            params: {
                action: 'Identity/logOut'
            }
        })
            .then(function (response) {
                    return response.data;
                },
                function (response) {
                    return {access: 'denied', server: response};
                });
    };

    this.redirectTab = function () {
        $rootScope.page = sessionStorage.getItem('page');
    };

});
