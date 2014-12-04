module.exports = function(history) {

    var tictactoeState = require('./tictactoeState');

    var gameState = tictactoeState(history);

    return {
        executeCommand: function(cmd) {

            var cmdHandlers = {
                "CreateGame": function(cmd) {
                    //console.log("Game created by ", currentPlayer);
                    return [{
                        event: "GameCreated",
                        user: cmd.user,
                        name: cmd.name,
                        timeStamp: cmd.timeStamp
                    }]
                },
                "MovePlayer": function(cmd) {
                    if (!gameState.isGameCreated()) {
                        return [{
                            event: "GameNotExists",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp
                        }];
                    }
                    if (gameState.currentPlayer().userName === cmd.user.userName) {
                        return [{
                            event: "PlayerMoved",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp
                        }]
                    } 
                    if(gameState.currentPlayer().userName !== cmd.user.userName) {
                        return [{
                            event: "MovePlayerAttempted",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp
                        }];
                    }
                },
                //"": function(cmd) {},
                //"": function(cmd) {},

                "JoinGame": function(cmd) {
                    if (gameState.gameFull()) {
                        console.log("Game full");
                        return [{
                            event: "FullGameJoinAttempted",
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp
                        }];
                    }

                    console.log("Join game");
                    return [{
                        event: "GameJoined",
                        user: cmd.user,
                        name: cmd.name,
                        timeStamp: cmd.timeStamp
                    }];
                }


            }
            return cmdHandlers[cmd.cmd](cmd);
        }
    }
};