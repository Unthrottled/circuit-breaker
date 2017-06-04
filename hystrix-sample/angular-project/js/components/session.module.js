'use strict';

var app = angular.module('myapp');

app.service('sessionService', ["$http", "hostService", 'rx', function ($http, hostService, rx) {
    var self = this;
    self.NO_SESSION_ID = "LOL NOPE";
    self.sessionId = self.NO_SESSION_ID;
    return {
        getSessionId: function () {
            if (self.sessionId === self.NO_SESSION_ID) {
                return rx.Observable.fromPromise($http.get(hostService + 'get/stream-id'))
                    .map(function (response) {
                        self.sessionId = response;
                        return self.sessionId;
                    });
            } else {
                return rx.Observable.of(self.sessionId);
            }
        }
    }
}]);