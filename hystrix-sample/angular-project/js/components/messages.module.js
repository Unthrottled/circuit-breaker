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

app.service('messageService', ['sessionService', 'hostService', function (sessionService, hostService) {
    var self = this;
    self.messageObserver = sessionService.getSessionId()
        .map(function (sessionId) {
            const eventSource = new EventSource(hostService.getUrl() + sessionId + '/test.stream');
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