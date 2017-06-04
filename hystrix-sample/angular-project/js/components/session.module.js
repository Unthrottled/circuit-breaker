'use strict';

var app = angular.module('myapp');

app.service('sessionService', ["$q", "$http", "hostService", function ($q, $http, hostService) {
    var self = this;
    self.NO_SESSION_ID = "LOL NOPE";
    self.sessionId = self.NO_SESSION_ID;
    return {
        getSessionId: function () {
            if (self.sessionId === self.NO_SESSION_ID) {
                return $http.get(hostService + 'get/stream-id')
                    .then(function (response) {
                        self.sessionId = response;
                        return self.sessionId;
                    })
            } else {
                return $q.defer()
                    .resolve(self.sessionId)
                    .promise;
            }
        }
    }
}]);