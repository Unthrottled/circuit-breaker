'use strict';

var app = angular.module('myApp');

app.service('sessionService', ["$http", "hostService", 'rx', function ($http, hostService, rx) {
    var self = this;
    self.NO_SESSION_ID = "LOL NOPE";
    self.sessionId = self.NO_SESSION_ID;
    return {
        getSessionId: function () {
            if (self.sessionId === self.NO_SESSION_ID) {
                return rx.Observable.fromPromise($http.get(hostService.getUrl() + 'get/stream-id'))
                    .map(function (response) {
                        self.sessionId = response.data;
                        return self.sessionId;
                    });
            } else {
                return rx.Observable.of(self.sessionId);
            }
        }
    }
}]);