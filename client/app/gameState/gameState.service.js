'use strict';

angular.module('tictactoeApp')
    .factory('gameState', function() {
        return function() {

            var gameState = {
                created: true,
                board: [['X', 'X', ''], ['', '', ''], ['', '', '']]
            };

            return gameState;
        };
    });