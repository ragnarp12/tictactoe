var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe');
var testMethod = require('./testMethods');

describe('join game command', function() {

    it('should emit game joined event', function() {

        var given = [
            testMethod.eventCreateGame("Ragnar", testMethod.testName, "X", "1")
        ];

        var when = testMethod.cmdJoinGame("Kiddi", testMethod.testName, "O", "1");

        var then = [{
            event: "GameJoined",
            id: "1",
            user: {
                userName: "Kiddi"
            },
            name: testMethod.testName,
            timeStamp: testMethod.testTimeStamp,
            side: "O"
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents).eql(then);
    });

    it('should emit FullGameJoinAttempted event when game full', function() {

        var given = [
            testMethod.eventCreateGame("Ragnar", testMethod.testName, "X", "1"),
            testMethod.eventJoinGame("Kiddi", testMethod.testName, "O", "1")
        ];

        var when = testMethod.cmdJoinGame("Kalli", testMethod.testName, "O", "1");

        var then = [{
            event: "FullGameJoinAttempted",
            id: "1",
            user: {
                userName: "Kalli"
            },
            name: testMethod.testName,
            timeStamp: testMethod.testTimeStamp
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents).eql(then);
    });


    it('should emit no username trying join event', function() {

        var given = [
            testMethod.eventCreateGame("Ragnar", testMethod.testName, "X", "1")
        ];

        var when = testMethod.cmdJoinGame("", testMethod.testName, "O", "1");

        var then = [{
            event: "NoUserNameJoin",
            id: "1",
            user: {
                userName: ""
            },
            name: testMethod.testName,
            timeStamp: testMethod.testTimeStamp
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents).eql(then);
    });

    it('should emit no game name join event', function() {

        var given = [
            testMethod.eventCreateGame("Ragnar", testMethod.testName, "X", "1")
        ];

        var when = testMethod.cmdJoinGame("Kiddi", "", "O", "1");

        var then = [{
            event: "JoinNoNameProvided",
            id: "1",
            user: {
                userName: "Kiddi"
            },
            name: "",
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