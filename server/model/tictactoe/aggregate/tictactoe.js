module.exports = function(history) {

    var tictactoeState = require('./tictactoeState');

    var gameState = tictactoeState(history);


    return {
        executeCommand: function(cmd) {

            var cmdHandlers = {
                "CreateGame": function(cmd) {
                    if (!cmd.user.userName) {
                        return [{
                            event: "GameNoUserName",
                            id: cmd.id,
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp
                        }];
                    } else if (!cmd.name) {
                        return [{
                            event: "GameNoName",
                            id: cmd.id,
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp
                        }];
                    } else if (!cmd.timeStamp) {
                        return [{
                            event: "GameNoTimeStamp",
                            id: cmd.id,
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp
                        }];
                    } else
                        return [{
                            event: "GameCreated",
                            id: cmd.id,
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp,
                            side: cmd.side
                        }]
                },
                "MovePlayer": function(cmd) {
                    if (!gameState.isGameCreated()) {
                        return [{
                            event: "GameNotExists",
                            id: cmd.id,
                            user: cmd.user,
                            name: cmd.name,
                            coord: cmd.coord,
                            timeStamp: cmd.timeStamp
                        }];
                    }

                    if (gameState.currentPlayer().userName !== cmd.user.userName) {
                        //console.log("currentPlayer: ",gameState.currentPlayer());
                        return [{
                            event: "MovePlayerAttempted",
                            id: cmd.id,
                            user: cmd.user,
                            name: cmd.name,
                            coord: cmd.coord,
                            timeStamp: cmd.timeStamp,
                            side: cmd.side
                        }];
                    }

                    if (cmd.coord.length !== 2) {
                        return [{
                            event: "MoveWrongCoordLength",
                            id: cmd.id,
                            user: cmd.user,
                            name: cmd.name,
                            coord: cmd.coord,
                            timeStamp: cmd.timeStamp
                        }]
                    }

                    var currPlayer = gameState.currentPlayer().userName;
                    if (currPlayer === cmd.user.userName) {
                        //console.log("GameState: ", gameState.currentPlayer().userName);
                        //console.log("cmd Username: ", cmd.user.userName);
                        if (gameState.movePlayer(cmd.coord)) {
                            if (gameState.checkWin()) {
                                //console.log("Game won");
                                return [{
                                    event: "GameWin",
                                    id: cmd.id,
                                    user: cmd.user,
                                    name: cmd.name,
                                    coord: cmd.coord,
                                    timeStamp: cmd.timeStamp,
                                    side: cmd.side
                                }];
                            } 
                            if (gameState.checkDraw()) {
                                return [{
                                    event: "GameDraw",
                                    id: cmd.id,
                                    user: cmd.user,
                                    name: cmd.name,
                                    coord: cmd.coord,
                                    timeStamp: cmd.timeStamp,
                                    side: cmd.side
                                }];
                            } else {

                                return [{
                                    event: "PlayerMoved",
                                    id: cmd.id,
                                    user: cmd.user,
                                    name: cmd.name,
                                    coord: cmd.coord,
                                    timeStamp: cmd.timeStamp,
                                    side: cmd.side
                                }];
                            }
                        } else {
                            return [{
                                event: "IllegalMove",
                                id: cmd.id,
                                user: cmd.user,
                                name: cmd.name,
                                coord: cmd.coord,
                                timeStamp: cmd.timeStamp
                            }];
                        }
                    }
                },
                //"": function(cmd) {},
                //"": function(cmd) {},

                "JoinGame": function(cmd) {
                    if (!cmd.name || cmd.name === "") {
                        return [{
                            event: "JoinNoNameProvided",
                            id: cmd.id,
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp
                        }];
                    }

                    if (gameState.gameFull()) {
                        //console.log("Game full");
                        return [{
                            event: "FullGameJoinAttempted",
                            id: cmd.id,
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp
                        }];
                    } else if (cmd.user.userName === "" || !cmd.user.userName) {
                        return [{
                            event: "NoUserNameJoin",
                            id: cmd.id,
                            user: cmd.user,
                            name: cmd.name,
                            timeStamp: cmd.timeStamp
                        }]
                    }

                    //console.log("Joning game: ",cmd.user);
                    return [{
                        event: "GameJoined",
                        id: cmd.id,
                        user: cmd.user,
                        name: cmd.name,

                        timeStamp: cmd.timeStamp,
                        side: cmd.side
                    }];
                }

            }
            return cmdHandlers[cmd.cmd](cmd);
        }
    }
};