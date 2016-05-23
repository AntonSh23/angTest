'use strict';

angular.module('ANGApp').service('logInService', function ($http, $rootScope, $location) {
    this.checkIdentity = function (login, password) {
        return $http({
            method: 'POST',
            url: 'server/ANGAPI.php',
            params: {
                password: password,
                login: login,
                action: 'Identity/getUserInfo'
            }
        })
            .then(function (response) {
                console.log(response.data);
                if (response.data.userdata.length == 0) {
                    alert('Такого пользователя не существует!')
                } else {
                    return response.data;
                }
            });
    };

    this.saveDataToStorage = function (response) {
        $rootScope.userData = response.userdata[0];
        $rootScope.urlServerLoc = $location.host();
        $rootScope.access = 'granted';
        $rootScope.page = 'account';
        $rootScope.filledStorage = 'yes';
        console.log($rootScope.userData);


        sessionStorage.setItem('userData', JSON.stringify($rootScope.userData));
        sessionStorage.setItem('urlServerLoc', JSON.stringify($rootScope.urlServerLoc));
        sessionStorage.setItem('access', JSON.stringify($rootScope.access));
        sessionStorage.setItem('page', JSON.stringify($rootScope.page));
        sessionStorage.setItem('filledStorage', $rootScope.filledStorage);
    };

    this.restoreDataFromLocalStorage = function () {
        $rootScope.access = JSON.parse(sessionStorage.getItem('access'));
        $rootScope.userData = JSON.parse(sessionStorage.getItem('userData'));
        $rootScope.urlServerLoc = JSON.parse(sessionStorage.getItem('urlServerLoc'));
        $rootScope.page = sessionStorage.getItem('page');
        $rootScope.filledStorage = sessionStorage.getItem('filledStorage');
    }

});