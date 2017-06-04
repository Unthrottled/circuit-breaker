'use strict';

var app = angular.module('myApp');
app.controller('messageCtrl', ["$scope", function ($scope) {
    $scope.events = [];
    $scope.init = function () {

        // eventSource.onmessage = function(event){
        //     if($scope.events.length > 10){
        //         $scope.events.splice(0,1);
        //     }
        //     $scope.events.push(event.data);
        //     $scope.$apply();
        // }
    }
}]);

app.service('messageService', [function () {
    var self = this;
    self.messageObserver = Observable.create(function (observer) {
        const eventSource = new EventSource('/interval-sse-observable');
        eventSource.onmessage = function (x) {
            observer.next(console.log(JSON.parse(x.data)));
        };
        eventSource.onerror = function (x) {
            observer.error(console.log('EventSource failed ' + e));
        };
        return function () {
            eventSource.close();
        };
    });
    return {
        messageStream: self.messageObserver
    }
}]);