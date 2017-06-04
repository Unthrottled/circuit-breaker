'use strict';

var app = angular.module('myApp');
app.controller('knobCtrl',['$scope', '$http', 'hostService', 'sessionService', function ($scope, $http, hostService, sessionService) {
    $scope.value = 0;
    sessionService.getSessionId()
        .subscribe(function(sessionId){
            $http.get(hostService.getUrl() + 'get/' + sessionId + '/throttle')
                .then(function(response){
                    $scope.value = response.data.requestsPerSecond;
                });
        });
    $scope.options = {
        startAngle: 30,
        endAngle: 330,
        trackColor: "rgba(162,121,143,1)",
        barColor: 'rgba(102,0,204,.5)',
        trackWidth: 15,
        barWidth: 15,
        subText: {
            enabled: true,
            text: 'Requests/second'
        },
        max: 100,
        scale: {
            enabled: true,
            type: 'lines',
            width: 3
        }
    };
}]);