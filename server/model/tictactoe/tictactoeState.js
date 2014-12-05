var _ = require('lodash');

module.exports = function(history) {

    var row;
    var col;
    var player1, player2;
    var gameFull = false;
    var gameCreated = false;
    var currentPlayer = null;
    var gridSize = 3;
    var gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    _.each(history, function(event) {
        if (event.event === "GameJoined") {
            player2 = event.user;
            gameFull = true;
        }
        if (event.event === "GameCreated") {
            currentPlayer = event.user;
            player1 = event.user;
            gameCreated = true;
        }
        if(event.event === "") {
          
        }
    });

    function isFree() {
        return (gameBoard[col][row] === '');
    }

    function isOutOfBounds() {
        return ((row >= gridSize) || (col >= gridSize));
    }

    function switchPlayer() {
        currentPlayer = (currentPlayer.username === player1.username ? player2.username : player1.username);
    }

    function movePlayer() {
        if (isFree() && !isOutOfBounds()) {
            gameBoard[row][col] = (currentPlayer.username === player1.username ? 'X' : 'O');
            switchPlayer();
            resetBoard();
            draw();
            return true;
        }
        return false;
    }

    function resetBoard () {
      for(i = 0; i<gridSize; i++) {
        gameBoard[i][0] = (gameBoard[i][0] === '' ? '-' : gameBoard[i][0]);
        gameBoard[i][1] = (gameBoard[i][1] === '' ? '-' : gameBoard[i][1]);
        gameBoard[i][2] = (gameBoard[i][2] === '' ? '-' : gameBoard[i][2]);
      }
    }

    function draw() {
      for(i = 0; i<gridSize; i++) {
        console.log(gameBoard[i][0] + gameBoard[i][1] + gameBoard[i][2] );
      }
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
            row = coord[0];
            col = coord[1];
            return movePlayer();
        }

    }
};