'use strict';

angular.module('tictactoeApp')
    .controller('TictactoeCtrl', ['$scope', 'gameState',
        function($scope, gameState) {

        	$scope.test = '';

        	$scope.game = gameState();
        }
    ]);