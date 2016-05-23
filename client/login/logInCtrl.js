'use strict';

angular.module('ANGApp').controller('logInCtrl', function ($scope, $rootScope, logInService) {

   (function (){
        if(sessionStorage.getItem('filledStorage') == 'yes'){
            logInService.restoreDataFromLocalStorage();
        }
    })();

    $scope.user = {
        login: '',
        password: ''
    };

    $scope.checkIdentity = function () {
        if ($scope.loginForm.$valid) {
            logInService.checkIdentity($scope.user.login, $scope.user.password).then(function (response) {
                logInService.saveDataToStorage(response);
            });
        }
    }
});