'use strict';

angular.module('tictactoeApp')
    .controller('TictactoeController', ['$scope', 'gameState', 'guid',
        function($scope, gameState, guid) {

        	$scope.gameState = gameState();
        	$scope.guid = guid();
        	
        }
    ]);