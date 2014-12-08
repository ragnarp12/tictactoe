var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe');
var testMethod = require('./testMethods');

describe('join game command', function() {

    it('should emit game joined event', function() {

        var given = [
            testMethod.eventCreateGame("Ragnar")
        ];

        var when = testMethod.cmdJoinGame("Kiddi", testMethod.testName);

        var then = [{
            event: "GameJoined",
            user: {
                userName: "Kiddi"
            },
            name: testMethod.testName,
            timeStamp: testMethod.testTimeStamp
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents).eql(then);
    });

    it('should emit FullGameJoinAttempted event when game full', function() {

        var given = [
            testMethod.eventCreateGame("Ragnar"),
            testMethod.eventJoinGame("Kiddi")
        ];

        var when = testMethod.cmdJoinGame("Kalli", testMethod.testName);

        var then = [{
            event: "FullGameJoinAttempted",
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
            testMethod.eventCreateGame()
        ];

        var when = testMethod.cmdJoinGame("", testMethod.testName);

        var then = [{
            event: "NoUserNameJoin",
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
            testMethod.eventCreateGame("Ragnar")
        ];

        var when = testMethod.cmdJoinGame("Kiddi", "");

        var then = [{
            event: "JoinNoNameProvided",
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