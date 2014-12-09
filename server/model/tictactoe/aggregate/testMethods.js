'use strict';

var testTimeStamp = "2014-12-02T11:29:29";
var testName = "TheFirstGame"

exports.testTimeStamp = testTimeStamp;
exports.testName = testName;

exports.eventCreateGame = function(username, gName, gId) {
    return {
        event: "GameCreated",
        id: gId,
        user: {
            userName: username
        },
        name: gName,
        timeStamp: testTimeStamp
    };
};

exports.cmdCreateGame = function(username, gName, gId) {
    return {
        cmd: "CreateGame",
        id: gId,
        user: {
            userName: username
        },
        name: gName,
        timeStamp: testTimeStamp
    };
};

exports.eventJoinGame = function(username, gName, gId) {
    return {
        event: "GameJoined",
        id: gId,
        user: {
            userName: username
        },
        name: gName,
        timeStamp: testTimeStamp

    };
};

exports.cmdJoinGame = function(username, gName, gId) {
    return {
        cmd: "JoinGame",
        id: gId,
        user: {
            userName: username
        },
        name: gName,
        timeStamp: testTimeStamp
    };
};

exports.eventMovePlayer = function(username, coords, gId) {
    return {
        event: "MoveMade",
        id: gId,
        user: {
            userName: username
        },
        name: testName,
        coord: coords,
        timeStamp: testTimeStamp
    };
};

exports.cmdMovePlayer = function(username, coords, gId) {
    return {
        cmd: "MovePlayer",
        id: gId,
        user: {
            userName: username
        },
        name: testName,
        coord: coords,
        timeStamp: testTimeStamp
    };
};