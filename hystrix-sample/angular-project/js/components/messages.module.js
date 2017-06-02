'use strict';

var app = angular.module('messages',[]);
app.controller('messageCtrl',["$scope", "$window", function ($scope, $window) {
    $scope.events = [];
    $scope.init = function(){
        var eventSource = new EventSource('http://' + $window.location.hostname + ':' + $window.location.port + '/test.stream');
        eventSource.onmessage = function(event){
            if($scope.events.length > 10){
                $scope.events.splice(0,1);
            }
            $scope.events.push(event.data);
            $scope.$apply();
        }
    }
}]);