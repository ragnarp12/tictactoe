'use strict';

var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe');
var testMethod = require('./testMethods');

describe('move player command', function() {

    it('should emit player moved event', function() {

        var genid = testMethod.uuid();

        var given = [
            testMethod.eventCreateGame("Ragnar", testMethod.testName, genid),
            testMethod.eventJoinGame("Kiddi", testMethod.testName, genid)
        ];

        var when = testMethod.cmdMovePlayer("Ragnar", "X", [0, 0], genid);

        var then = [{
            event: "PlayerMoved",
            id: genid,
            user: {
                userName: "Ragnar"
            },
            name: testMethod.testName,
            coord: [0, 0],
            timeStamp: testMethod.testTimeStamp,
            side: "X"
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents).eql(then);
    });

    it('should emit player moved attempted where use is O but should be X event', function() {

        var genid = testMethod.uuid();

        var given = [
            testMethod.eventCreateGame("Ragnar", testMethod.testName, genid),
            testMethod.eventJoinGame("Kiddi", testMethod.testName, genid)
        ];

        var when = testMethod.cmdMovePlayer("Kiddi", "O", [0, 0], genid);

        var then = [{
            event: "MovePlayerAttempted",
            id: genid,
            user: {
                userName: "Kiddi"
            },
            name: testMethod.testName,
            coord: [0, 0],
            timeStamp: testMethod.testTimeStamp,
            side: "O"
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents).eql(then);
    });

    it('should emit player moved attempted where use is X but should be O event', function() {

        var genid = testMethod.uuid();

        var given = [
            testMethod.eventCreateGame("Ragnar", testMethod.testName, genid),
            testMethod.eventJoinGame("Kiddi", testMethod.testName, genid),
            testMethod.eventMovePlayer("Ragnar", "X", [0, 0], genid)
        ];

        var when = testMethod.cmdMovePlayer("Ragnar", "X", [0, 1], genid);

        var then = [{
            event: "MovePlayerAttempted",
            id: genid,
            user: {
                userName: "Ragnar"
            },
            name: testMethod.testName,
            coord: [0, 1],
            timeStamp: testMethod.testTimeStamp,
            side: "X"
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents).eql(then);
    });


    it('should emit player X won event', function() {

        var genid = testMethod.uuid();

        var given = [
            testMethod.eventCreateGame("Ragnar", testMethod.testName, genid),
            testMethod.eventJoinGame("Kiddi", testMethod.testName, "O", genid),
            testMethod.eventMovePlayer("Ragnar", "X", [0, 0], genid),
            testMethod.eventMovePlayer("Kiddi", "O", [0, 1], genid),
            testMethod.eventMovePlayer("Ragnar", "X", [1, 0], genid),
            testMethod.eventMovePlayer("Kiddi", "O", [0, 2], genid)
        ];

        var when = testMethod.cmdMovePlayer("Ragnar", "X", [2, 0], genid);

        var then = [{
            event: "GameWin",
            id: genid,
            user: {
                userName: "Ragnar"
            },
            coord: [2, 0],
            name: testMethod.testName,
            timeStamp: testMethod.testTimeStamp,
            side: "X"
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents).eql(then);
    });

    it('should emit game draw event', function() {

        var genid = testMethod.uuid();

        var given = [
            testMethod.eventCreateGame("Ragnar", testMethod.testName, genid),
            testMethod.eventJoinGame("Kiddi", testMethod.testName, genid),
            testMethod.eventMovePlayer("Ragnar", "X", [0, 1], genid),
            testMethod.eventMovePlayer("Kiddi", "O", [0, 0], genid),

            testMethod.eventMovePlayer("Ragnar", "X", [1, 1], genid),
            testMethod.eventMovePlayer("Kiddi", "O", [2, 0], genid),

            testMethod.eventMovePlayer("Ragnar", "X", [2, 2], genid),
            testMethod.eventMovePlayer("Kiddi", "O", [2, 1], genid),

            testMethod.eventMovePlayer("Ragnar", "X", [0, 2], genid),
            testMethod.eventMovePlayer("Kiddi", "O", [1, 2], genid)
        ];

        var when = testMethod.cmdMovePlayer("Ragnar", "X", [1, 0], genid);

        var then = [{
            event: "GameDraw",
            id: genid,
            user: {
                userName: "Ragnar"
            },
            coord: [1, 0],
            name: testMethod.testName,
            timeStamp: testMethod.testTimeStamp,
            side: "X"
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents).eql(then);
    });


    it('should emit no coord provided event', function() {

        var genid = testMethod.uuid();

        var given = [
            testMethod.eventCreateGame("Ragnar", testMethod.testName, genid),
            testMethod.eventJoinGame("Kiddi", testMethod.testName, genid),
        ];

        var when = testMethod.cmdMovePlayer("Ragnar", "X", [], genid);

        var then = [{
            event: "MoveWrongCoordLength",
            id: genid,
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