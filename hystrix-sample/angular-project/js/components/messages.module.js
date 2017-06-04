'use strict';

var app = angular.module('myApp');
app.controller('messageCtrl', ["$scope", 'messageService', function ($scope, messageService) {
    $scope.messages = [];
    messageService.messageStream.subscribe(function (message) {
        if ($scope.messages.length > 10) {
            $scope.messages.splice(0, 1);
        }
        $scope.messages.push(message);
        $scope.$apply();
    });
}]);

app.service('messageService', ['sessionService', 'hostService', 'rx', function (sessionService, hostService, rx) {
    var self = this;
    self.messageObserver = sessionService.getSessionId()
        .flatMap(function (sessionId) {
            return rx.Observable.create(function (observer) {
                var eventSource = new EventSource(hostService.getUrl() + sessionId + '/test.stream');
                eventSource.onmessage = function (x) {
                    observer.next(x.data);
                };
                eventSource.onerror = function (x) {
                    observer.error(console.log('EventSource failed ' + x));
                };
                return function () {
                    eventSource.close();
                };
            });
        });
    return {
        messageStream: self.messageObserver
    }
}]);