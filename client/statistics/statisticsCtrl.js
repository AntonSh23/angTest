/**
 * Created by ashulpekov on 24.02.2016.
 */

angular.module('ANGApp').controller('statisticsCtrl', function ($scope, $rootScope, statisticsService) {

    $scope.allTasks = [];

    $scope.predicate = 'age';

    $scope.reverse = true;

    $scope.taskDescription = {
        taskInfo: '',
        taskDisplayStatus: 0,
        executer: '',
        responsible: ''
    };

    $scope.archievePeriod = '';

    $scope.order = function (predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
        $scope.predicate = predicate;
    };

    $scope.getTasks = function (year, month) {
        statisticsService.getTasks(year, month).then(function (response) {

            var $preloader = $('#page-preloader');
            var $spinner = $preloader.find('.spinner');
            $spinner.fadeOut();
            $preloader.delay(500).fadeOut('slow');


            $scope.allTasks = response.archieveTasks;
            $scope.archievePeriod = response.archievePeriod;
        });
    };

    $scope.getTaskData = function (id, executer, responsible) {
        statisticsService.getTaskData(id).then(function (response) {
            $scope.taskDescription.taskInfo = response.archieveTaskDetails;
            $scope.taskDescription.taskDisplayStatus = 1;
            $scope.taskDescription.executer = executer;
            $scope.taskDescription.responsible = responsible;
        });
    };

    $scope.hideTaskDescription = function () {
        $scope.taskDescription = [];
    };});