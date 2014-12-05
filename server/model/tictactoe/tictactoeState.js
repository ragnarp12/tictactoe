var _ = require('lodash');

module.exports = function(history) {

    var gameFull = false;
    var gameCreated = false;
    var currentPlayer;

    var gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    _.each(history, function(event) {
        if (event.event === "GameJoined") {
            gameFull = true;
        }
        if (event.event === "GameCreated") {
            currentPlayer = event.user;
            gameCreated = true;
        }
    });

    function isFree(coord) {
        var col = coord[0];
        var row = coord[1];
        return (gameBoard[col][row] === '');
    }

    function movePlayer(coord) {
        if (isFree(coord)) {
            return true;
        }
        return false;
    }

    return {
        gameFull: function() {
            return gameFull;
        },
        currentPlayer: function() {
            return currentPlayer;
        },
        isGameCreated: function() {
            return gameCreated;
        },
        movePlayer: function(coord) {
            return movePlayer(coord);
        }

    }
};