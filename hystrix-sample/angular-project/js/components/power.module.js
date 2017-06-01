'use strict';

var app = angular.module('power', ['ngMaterial']);
app.controller('powerCtrl',['$scope', '$window', function ($scope, $window) {
    $scope.value = 65;
    $scope.doSomething = function(){
        $window.alert("POOP");
    }
}]);