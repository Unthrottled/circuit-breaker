'use strict';

var app = angular.module('knob', ['ui.knob']);
app.controller('knobCtrl', function ($scope) {
    $scope.value = 65;
    $scope.options = {
        startAngle: 30,
        endAngle: 330,
        trackColor: "rgba(162,121,143,1)",
        barColor: 'rgba(102,0,204,.5)',
        trackWidth: 15,
        barWidth: 15,
        subText: {
            enabled: true,
            text: 'Requests/second'
        },
        max: 100,
        scale: {
            enabled: true,
            type: 'lines',
            width: 3
        }
    };
});