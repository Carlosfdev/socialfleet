angular.module('app').controller('Scheduler', function($scope, $http) {

    $scope.minDate = new Date();
    $scope.time = new Date();

    $scope.tweet = function() {
        var sendAt = new Date(
            $scope.date.getFullYear(),
            $scope.date.getMonth(),
            $scope.date.getDate(),
            $scope.time.getHours(),
            $scope.time.getMinutes()
        );

        $http.post('/api/post/tweet', {
            message: $scope.message,
            sendAt: sendAt
        }).then(function() {

        });
    };

    $scope.opened = false;

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = !$scope.opened;
    };
});
