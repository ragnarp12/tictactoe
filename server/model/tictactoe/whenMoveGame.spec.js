'use strict';

var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe');
var testMethod = require('./testMethods');

var movePlayer = function(username, coords) {
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

var moveMade = function(username, coords) {
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

describe('move player command', function() {

    it('should emit player moved event', function() {
        var given = [
            testMethod.createGame("Ragnar"),
            testMethod.joinGame("Kiddi")
        ];

        var when = movePlayer("Ragnar", [0, 0]);

        var then = [{
            event: "PlayerMoved",
            user: {
                userName: "Ragnar"
            },
            name: "TheFirstGame",
            coord: [0, 0],
            timeStamp: "2014-12-02T11:29:29"
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents).eql(then);
    });

    it('should emit player moved attempted event', function() {
        var given = [
            testMethod.createGame("Ragnar"),
            testMethod.joinGame("Kiddi")
        ];

        var when = movePlayer("Kiddi", [0, 0]);

        var then = [{
            event: "MovePlayerAttempted",
            user: {
                userName: "Kiddi"
            },
            name: "TheFirstGame",
            coord: [0, 0],
            timeStamp: "2014-12-02T11:29:29"
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents).eql(then);
    });

    it('should emit player X won event', function() {
        var given = [
            testMethod.createGame("Ragnar"),
            testMethod.joinGame("Kiddi"),
            moveMade("Ragnar", [0, 0]),
            moveMade("Kiddi", [0, 1]),
            moveMade("Ragnar", [1, 0]),
            moveMade("Kiddi", [0, 2])
        ];

        var when = movePlayer("Ragnar", [2, 0]);

        var then = [{
            event: "GameWin",
            user: {
                userName: "Ragnar"
            },
            coord: [2, 0],
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents).eql(then);
    });

    it('should emit game draw event', function() {

        var given = [
            testMethod.createGame("Ragnar"),
            testMethod.joinGame("Kiddi"),
            moveMade("Ragnar", [0, 1]),
            moveMade("Kiddi", [0, 0]),

            moveMade("Ragnar", [1, 1]),
            moveMade("Kiddi", [2, 0]),

            moveMade("Ragnar", [2, 2]),
            moveMade("Kiddi", [2, 1]),

            moveMade("Ragnar", [0, 2]),
            moveMade("Kiddi", [1, 2])
        ];

        var when = movePlayer("Ragnar", [1,0]);

        var then = [{
            event: "GameDraw",
            user: {
                userName: "Ragnar"
            },
            coord: [1, 0],
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents).eql(then);
    });

});


/*

 it('should emit player moved event', function() {

 var actualEvents = tictactoe(given).executeCommand(when);
 should(actualEvents).eql(then);
 });

 */