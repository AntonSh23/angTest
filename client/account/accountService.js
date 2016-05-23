'use strict';


angular.module('ANGApp').service('accountService', function ($http, $rootScope) {

    this.changeUserDataFunc = function(newData, oldData){
        return $http({
            method: 'POST',
            url: 'server/ANGAPI.php',
            params: {
                action: 'SupportData/updateUserData',
                newData: newData,
                oldData: oldData
            }
        })
            .then(function (response) {
                if(response.data == 'true'){
                    alert('Данные обновлены, перезайдите в систему, для их обновления!');
                } else {
                    alert('Ошибка выполнения запроса!')
                }
            });
    };

    this.changePasswordFunc = function(newData, oldData){
        return $http({
            method: 'POST',
            url: 'server/ANGAPI.php',
            params: {
                action: 'SupportData/changePassword',
                newData: newData,
                oldData: oldData
            }
        })
            .then(function (response) {
                if(response.data == 'true'){
                    alert('Данные обновлены, перезайдите в систему, для их обновления!');
                } else {
                    alert('Ошибка выполнения запроса!')
                }
            });
    };

});
