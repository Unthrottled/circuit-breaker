'use strict';

var app = angular.module('myApp');
app.controller('mainCtrl', ['$scope', function ($scope) {
    $scope.initSession = function(){
        console.log("poop");
    }
}]);
app.service('orchestrator', [function () {

}]);