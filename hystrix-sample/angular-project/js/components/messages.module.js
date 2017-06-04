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

app.service('messageService', ['sessionService', 'hostService', function (sessionService, hostService) {
    var self = this;
    self.messageObserver = sessionService.getSessionId()
        .map(function (sessionId) {
            var eventSource = new EventSource(hostService.getUrl() + sessionId + '/test.stream');
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