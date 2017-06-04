'use strict';

var app = angular.module('myapp');
app.service('hostService', ["$window", function ($window) {
    return {
        getUrl: function () {
            return 'http://' + $window.location.hostname + ':' + $window.location.port + '/';
        }
    }
}]);