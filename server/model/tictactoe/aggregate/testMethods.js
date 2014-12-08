'use strict';

var testTimeStamp = "2014-12-02T11:29:29";
var testName = "TheFirstGame"

exports.testTimeStamp = testTimeStamp;
exports.testName = testName;

exports.eventCreateGame = function(username, gName) {
    return {
        event: "GameCreated",
        user: {
            userName: username
        },
        name: gName,
        timeStamp: testTimeStamp
    };
};

exports.cmdCreateGame = function(username, gName) {
    return {
        cmd: "CreateGame",
        user: {
            userName: username
        },
        name: gName,
        timeStamp: testTimeStamp
    };
};

exports.eventJoinGame = function(username, gName) {
    return {
        event: "GameJoined",
        user: {
            userName: username
        },
        name: gName,
        timeStamp: testTimeStamp

    };
};

exports.cmdJoinGame = function(username, gName) {
    return {
        cmd: "JoinGame",
        user: {
            userName: username
        },
        name: gName,
        timeStamp: testTimeStamp
    };
};

exports.eventMovePlayer = function(username, coords) {
    return {
        event: "MoveMade",
        user: {
            userName: username
        },
        name: testName,
        coord: coords,
        timeStamp: testTimeStamp
    };
};

exports.cmdMovePlayer = function(username, coords) {
    return {
        cmd: "MovePlayer",
        user: {
            userName: username
        },
        name: testName,
        coord: coords,
        timeStamp: testTimeStamp
    };
};