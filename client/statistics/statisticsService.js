/**
 * Created by ashulpekov on 24.02.2016.
 */
angular.module('ANGApp').service('statisticsService', function ($http) {


    this.getTasks = function (year, month) {
        return $http({
            method: 'POST',
            url: 'server/ANGAPI.php',
            params: {
                action: 'Task/getArchieveTasks',
                selected_month: month,
                selected_year: year
            }
        })
            .then(function (response) {
                return response.data;
            });


    };

    this.getTaskData = function (id) {
        return $http({
            method: 'POST',
            url: 'server/ANGAPI.php',
            params: {
                action: 'Task/getArchieveTaskDetails',
                task_id: id
            }
        })
            .then(function (response) {
                return response.data;
            });


    };
});