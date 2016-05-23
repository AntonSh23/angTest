'use strict';

angular.module('ANGApp').controller('createproductCtrl', function ($scope, $rootScope, createproductService) {

  $scope.product = {
      name: '',
      price: '',
      description: ''
    };

  $scope.createProduct = function(){
        createproductService.createProduct($scope.product);
  }
});