'use strict';

var app = angular.module('Poop', ['ui.knob']);
app.controller('knobCtrl', function ($scope) {
    $scope.value = 65;
    $scope.options = {
        size: 300
    };
});