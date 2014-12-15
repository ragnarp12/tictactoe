'use strict';

angular.module('tictactoeApp')
    .factory('gameState', function() {
        return function() {

            var gameState = {
                created: false,
                id: undefined,
                board: [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', '']
                ],
                nextMove: 'X',
                player1: null,
                player2: null,
                draw: false,
                winner: undefined,
                gameFunc: function(events) {
                    var handlers = {
                        'GameCreated': function(event, gameState) {
                            gameState.created = true;
                            gameState.name = event.name;
                            gameState.id = event.id;
                            gameState.player1 = event.user;
                        },
                        'GameJoined': function(event, gameState) {
                            //console.log("Player joined");
                            gameState.player2 = event.user;
                        },
                        'PlayerMoved': function(event, gameState) {
                            gameState.nextMove = (event.side === 'X') ? 'O' : 'X';
                            gameState.board[event.coord[0]][event.coord[1]] = event.side;
                        },
                        'GameWin': function(event, gameState) {
                            gameState.board[event.coord[0]][event.coord[1]] = event.side;
                            gameState.nextMove = 'GameWon';
                            gameState.winner = {
                                userName: event.user.userName,
                                side: event.side
                            };
                        },
                        'GameDraw': function(event, gameState) {
                            gameState.draw = true;
                            gameState.nextMove = 'GameDraw';
                            gameState.board[event.coord[0]][event.coord[1]] = event.side;
                        }
                    };

                    _.each(events, function(ev) {
                        handlers[ev.event] && handlers[ev.event](ev, gameState) // jshint ignore:line
                    });
                }
            };

            return gameState;
        };
    });