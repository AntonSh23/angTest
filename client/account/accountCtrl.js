'use strict';


angular.module('ANGApp').controller('accountCtrl', function ($scope, $rootScope, accountService) {


   $scope.user = '';


    $scope.changeUserDataFunc = function (){
        accountService.changeUserDataFunc($scope.user, $rootScope.userData);
    };

    $scope.changePasswordFunc = function (){
        accountService.changePasswordFunc($scope.user, $rootScope.userData);
    };
});