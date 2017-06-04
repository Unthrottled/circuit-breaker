'use strict';

var app = angular.module('myApp');
app.controller('messageCtrl',["$scope", function ($scope) {
    $scope.events = [];
    $scope.init = function(){
        var eventSource = new EventSource('/test.stream');
        eventSource.onmessage = function(event){
            if($scope.events.length > 10){
                $scope.events.splice(0,1);
            }
            $scope.events.push(event.data);
            $scope.$apply();
        }
    }
}]);