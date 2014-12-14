'use strict';

angular.module('tictactoeApp')
    .controller('NavbarCtrl', function($scope, $location) {
        $scope.menu = [{
            'title': 'Create game',
            'link': '/'
        }, {
            'title': 'List games',
            'link': '/list'
        }];

        $scope.isCollapsed = true;

        $scope.isActive = function(route) {
            return route === $location.path();
        };
    });