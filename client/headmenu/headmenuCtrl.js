'use strict';


angular.module('ANGApp').controller('headmenuCtrl', function ($scope, $rootScope, headmenuService, $log) {

    $scope.redirectPage = function () {
        sessionStorage.setItem('page', $scope.page);
        headmenuService.redirectTab();
    };

    $scope.logout = function () {
        headmenuService.logout().then(function (response) {
            $rootScope.access = response.access;
            sessionStorage.clear()
        });
    }

});