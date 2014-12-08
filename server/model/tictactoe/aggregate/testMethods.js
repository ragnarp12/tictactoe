'use strict';

exports.eventCreateGame = function(username) {
    return {
        event: "GameCreated",
        user: {
            userName: username
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29"
    };
};

exports.cmdCreateGame = function(username, gamename) {
    return {
        cmd: "CreateGame",
        user: {
            userName: username
        },
        name: gamename,
        timeStamp: "2014-12-02T11:29:29"
    };
};

exports.eventJoinGame = function(username) {
    return {
        event: "GameJoined",
        user: {
            userName: username
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29"

    };
};

exports.cmdJoinGame = function(username) {
    return {
        cmd: "JoinGame",
        user: {
            userName: username
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29"
    };
};

exports.eventMovePlayer = function(username, coords) {
    return {
        event: "MoveMade",
        user: {
            userName: username
        },
        name: "TheFirstGame",
        coord: coords,
        timeStamp: "2014-12-02T11:29:29"
    };
};

exports.cmdMovePlayer = function(username, coords) {
    return {
        cmd: "MovePlayer",
        user: {
            userName: username
        },
        name: "TheFirstGame",
        coord: coords,
        timeStamp: "2014-12-02T11:29:29"
    };
};