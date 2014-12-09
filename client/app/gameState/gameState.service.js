'use strict';

angular.module('tictactoeApp')
    .factory('gameState', function() {
        return function() {

            var gameState = {
                created: true,
                board: [['X', 'X', 'O'], ['O', 'X', 'O'], ['O', 'O', 'X']]
            };

            return gameState;
        };
    });