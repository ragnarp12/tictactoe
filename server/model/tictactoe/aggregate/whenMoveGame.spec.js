'use strict';

var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe');
var testMethod = require('./testMethods');

describe('move player command', function() {

    it('should emit player moved event', function() {
        var given = [
            testMethod.eventCreateGame("Ragnar", testMethod.testName),
            testMethod.eventJoinGame("Kiddi", testMethod.testName)
        ];

        var when = testMethod.cmdMovePlayer("Ragnar", [0, 0]);

        var then = [{
            event: "PlayerMoved",
            user: {
                userName: "Ragnar"
            },
            name: testMethod.testName,
            coord: [0, 0],
            timeStamp: testMethod.testTimeStamp
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents).eql(then);
    });

    it('should emit player moved attempted event', function() {
        var given = [
            testMethod.eventCreateGame("Ragnar", testMethod.testName),
            testMethod.eventJoinGame("Kiddi", testMethod.testName)
        ];

        var when = testMethod.cmdMovePlayer("Kiddi", [0, 0]);

        var then = [{
            event: "MovePlayerAttempted",
            user: {
                userName: "Kiddi"
            },
            name: testMethod.testName,
            coord: [0, 0],
            timeStamp: testMethod.testTimeStamp
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents).eql(then);
    });

    it('should emit player X won event', function() {
        var given = [
            testMethod.eventCreateGame("Ragnar", testMethod.testName),
            testMethod.eventJoinGame("Kiddi", testMethod.testName),
            testMethod.eventMovePlayer("Ragnar", [0, 0]),
            testMethod.eventMovePlayer("Kiddi", [0, 1]),
            testMethod.eventMovePlayer("Ragnar", [1, 0]),
            testMethod.eventMovePlayer("Kiddi", [0, 2])
        ];

        var when = testMethod.cmdMovePlayer("Ragnar", [2, 0]);

        var then = [{
            event: "GameWin",
            user: {
                userName: "Ragnar"
            },
            coord: [2, 0],
            name: testMethod.testName,
            timeStamp: testMethod.testTimeStamp
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents).eql(then);
    });

    it('should emit game draw event', function() {

        var given = [
            testMethod.eventCreateGame("Ragnar", testMethod.testName),
            testMethod.eventJoinGame("Kiddi", testMethod.testName),
            testMethod.eventMovePlayer("Ragnar", [0, 1]),
            testMethod.eventMovePlayer("Kiddi", [0, 0]),

            testMethod.eventMovePlayer("Ragnar", [1, 1]),
            testMethod.eventMovePlayer("Kiddi", [2, 0]),

            testMethod.eventMovePlayer("Ragnar", [2, 2]),
            testMethod.eventMovePlayer("Kiddi", [2, 1]),

            testMethod.eventMovePlayer("Ragnar", [0, 2]),
            testMethod.eventMovePlayer("Kiddi", [1, 2])
        ];

        var when = testMethod.cmdMovePlayer("Ragnar", [1, 0]);

        var then = [{
            event: "GameDraw",
            user: {
                userName: "Ragnar"
            },
            coord: [1, 0],
            name: testMethod.testName,
            timeStamp: testMethod.testTimeStamp
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents).eql(then);
    });


    it('should emit no coord provided event', function() {

        var given = [
            testMethod.eventCreateGame("Ragnar", testMethod.testName),
            testMethod.eventJoinGame("Kiddi", testMethod.testName),
        ];

        var when = testMethod.cmdMovePlayer("Ragnar", []);

        var then = [{
            event: "MoveWrongCoordLength",
            user: {
                userName: "Ragnar"
            },
            coord: [],
            name: testMethod.testName,
            timeStamp: testMethod.testTimeStamp
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