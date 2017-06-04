'use strict';

var app = angular.module('myApp');

app.service('sessionService', ["$http", "hostService", 'rx', function ($http, hostService, rx) {
    var self = this;
    self.NO_SESSION_ID = "LOL NOPE";
    self.sessionId = rx.Observable.fromPromise($http.get(hostService.getUrl() + 'get/stream-id'))
        .share()//HOT OBSERVABLE
        .map(function (response) {
            self.sessionId = response.data;
            return self.sessionId;
        });
    return {
        getSessionId: function () {
            return self.sessionId;
        }
    }
}]);