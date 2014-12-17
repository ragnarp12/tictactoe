'use strict';

var testTimeStamp = "2014-12-02T11:29:29";
var testName = "TheFirstGame"

exports.testTimeStamp = testTimeStamp;
exports.testName = testName;

exports.eventCreateGame = function(username, gName, pside, gId) {
    return {
        event: "GameCreated",
        id: gId,
        user: {
            userName: username
        },
        name: gName,
        timeStamp: testTimeStamp,
        side: pside
    };
};

exports.cmdCreateGame = function(username, gName, pside, gId) {
    return {
        cmd: "CreateGame",
        id: gId,
        user: {
            userName: username
        },
        name: gName,
        timeStamp: testTimeStamp,
        side: pside
    };
};

exports.eventJoinGame = function(username, gName, pside, gId) {
    return {
        event: "GameJoined",
        id: gId,
        user: {
            userName: username
        },
        name: gName,
        timeStamp: testTimeStamp,
        side: pside
    };
};

exports.cmdJoinGame = function(username, gName, pside, gId) {
    return {
        cmd: "JoinGame",
        id: gId,
        user: {
            userName: username
        },
        name: gName,
        timeStamp: testTimeStamp,
        side: pside
    };
};

exports.eventMovePlayer = function(username, pside, coords, gId) {
    return {
        event: "PlayerMoved",
        id: gId,
        user: {
            userName: username
        },
        name: testName,
        coord: coords,
        timeStamp: testTimeStamp,
        side: pside
    };
};

exports.cmdMovePlayer = function(username, pside, coords, gId) {
    return {
        cmd: "MovePlayer",
        id: gId,
        user: {
            userName: username
        },
        name: testName,
        coord: coords,
        timeStamp: testTimeStamp,
        side: pside
    };
};

exports.uuid = function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    function calculate() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    //console.log('guid', calculate());

    return calculate();
}