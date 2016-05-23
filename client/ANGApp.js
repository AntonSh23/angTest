(function () {

    'use strict';
    var ANGApp = angular.module('ANGApp', [])
        .directive('validatePassword', function () {
            var PASSWORD_REGEXP = /^[a-zA-Z0-9]*$/;

            return {
                require: 'ngModel',
                restrict: '',
                link: function (scope, elm, attrs, ctrl) {
                    // only apply the validator if ngModel is present and Angular has added the email validator
                    if (ctrl && ctrl.$validators.password) {

                        // this will overwrite the default Angular email validator
                        ctrl.$validators.password = function (modelValue) {
                            return ctrl.$isEmpty(modelValue) || PASSWORD_REGEXP.test(modelValue);
                        };
                    }
                }
            }
        })
        .directive('compareTo', function (){
            return {
                require: "ngModel",
                scope: {
                    otherModelValue: "=compareTo"
                },
                link: function(scope, element, attributes, ngModel) {

                    ngModel.$validators.compareTo = function(modelValue) {
                        return modelValue == scope.otherModelValue;
                    };

                    scope.$watch("otherModelValue", function() {
                        ngModel.$validate();
                    });
                }
            };
        })

})();

