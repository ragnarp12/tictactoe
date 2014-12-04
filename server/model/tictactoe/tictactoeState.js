var _ = require('lodash');

module.exports = function(history) {

    var gameFull = false;
    var gameCreated = false;
    var currentPlayer;

    _.each(history, function(event) {
        if (event.event === "GameJoined") {
            gameFull = true;
        }
        if (event.event === "GameCreated") {
            currentPlayer = event.user;
            gameCreated = true;
        }
    });

    return {
        gameFull: function() {
            return gameFull;
        },
        currentPlayer: function() {
            return currentPlayer;
        },
        isGameCreated: function() {
            return gameCreated;
        }

    }
};