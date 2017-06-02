'use strict';

var app = angular.module('switch', ['uiSwitch']);
app.controller('switchCtrl', function ($scope) {
    $scope.enabled = true;
});