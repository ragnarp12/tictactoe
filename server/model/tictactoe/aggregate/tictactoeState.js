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
            //console.log("Player 2 kominn: ", player2.userName);
        }
        if (event.event === "GameCreated") {
            currentPlayer = event.user;
            player1 = event.user;
            gameCreated = true;
            //console.log("Player 1 kominn: ", player1.userName);
        }
        if (event.event === "PlayerMoved") {
            row = event.coord[0];
            col = event.coord[1];
            //console.log(event.user.userName);
            movePlayers();
        }
    });

    function isFree() {
        return (gameBoard[row][col] === '-');
    }

    function isOutOfBounds() {
        return ((row >= gridSize) || (col >= gridSize));
    }

    function switchPlayer() {
        //console.log("Before switch: ", currentPlayer.userName);
        currentPlayer = (currentPlayer.userName === player1.userName) ? player2 : player1;
        //console.log("After switch: ", currentPlayer.userName);
    }

    function movePlayers() {
        if (isFree() && !isOutOfBounds()) {
            //console.log("(currentPlayer === player1)", (currentPlayer.userName === player1.userName));
            gameBoard[row][col] = (currentPlayer.userName === player1.userName) ? 'X' : 'O';
            //draw();
            //console.log("Gameboard loc is: ", gameBoard[row][col]);
            //console.log("switchPlayer from: ", currentPlayer)
            switchPlayer();
            //console.log("switchPlayer to: ", currentPlayer)
            //draw();
            return true;
        }
        return false;
    }

    function checkDraw() {
        for (var i = 0; i < gridSize; i++) {
            for (var j = 0; j < gridSize; j++) {
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
                //console.log("GAmeWON")
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
            //console.log("Moving player");
            return movePlayers();
        },
        checkWin: function() {
            return checkWin();
        },
        checkDraw: function() {
            return checkDraw();
        }

    }
};