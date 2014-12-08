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
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
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
        if (event.event === "MoveMade") {
            row = event.coord[0];
            col = event.coord[1];

            movePlayer();
        }
    });

    function isFree() {
        return (gameBoard[row][col] === '-');
    }

    function isOutOfBounds() {
        return ((row >= gridSize) || (col >= gridSize));
    }

    function switchPlayer() {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
    }

    function movePlayer() {
        if (isFree() && !isOutOfBounds()) {
            gameBoard[row][col] = (currentPlayer === player1) ? 'X' : 'O';
            switchPlayer();
            //draw();
            return true;
        }
        return false;
    }

    function checkDraw() {
        for (i = 0; i < gridSize; i++) {
            for (j = 0; j < gridSize; j++) {
                if (gameBoard[i][j] === '-') {
                    return false;
                }
            }
        }
        return true;
    }

    function checkWin() {
        // vertical
        for (var i = 0; i < gridSize; i++) {
            if (gameBoard[0][i] === gameBoard[1][i] &&
                gameBoard[1][i] === gameBoard[2][i] &&
                gameBoard[2][i] !== '-') {
                return true;
            }
        }

        // Horizontal
        for (var j = 0; j < gridSize; j++) {
            if (gameBoard[j][0] === gameBoard[j][1] &&
                gameBoard[j][1] === gameBoard[j][2] &&
                gameBoard[j][2] !== '-') {
                return true;
            }
        }

        // Diagonal TopLeft-BottomRight
        if (gameBoard[0][0] === gameBoard[1][1] &&
            gameBoard[1][1] === gameBoard[2][2] &&
            gameBoard[2][2] !== '-') {
            return true;
        }

        // Diagonal BottomLeft-TopRight
        if (gameBoard[2][0] === gameBoard[1][1] &&
            gameBoard[1][1] === gameBoard[0][2] &&
            gameBoard[0][2] !== '-') {
            return true;
        }

        return false;
    }

    function draw() {
        /*for (i = 0; i < gridSize; i++) {
      console.log(gameBoard[i][0] + gameBoard[i][1] + gameBoard[i][2]);
    }*/

        console.log(gameBoard[0][0] + gameBoard[0][1] + gameBoard[0][2]);
        console.log(gameBoard[1][0] + gameBoard[1][1] + gameBoard[1][2]);
        console.log(gameBoard[2][0] + gameBoard[2][1] + gameBoard[2][2]);
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
        },
        checkWin: function() {
            return checkWin();
        },
        checkDraw: function() {
            return checkDraw();
        }

    }
};