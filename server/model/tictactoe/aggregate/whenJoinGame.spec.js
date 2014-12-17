var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe');
var testMethod = require('./testMethods');

describe('join game command', function() {

    it('should emit game joined event', function() {

        var genid = testMethod.uuid();

        var given = [
            testMethod.eventCreateGame("Ragnar", testMethod.testName, "X", genid)
        ];

        var when = testMethod.cmdJoinGame("Kiddi", testMethod.testName, "O", genid);

        var then = [{
            event: "GameJoined",
            id: genid,
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

        var genid = testMethod.uuid();

        var given = [
            testMethod.eventCreateGame("Ragnar", testMethod.testName, "X", genid),
            testMethod.eventJoinGame("Kiddi", testMethod.testName, "O", genid)
        ];

        var when = testMethod.cmdJoinGame("Kalli", testMethod.testName, "O", genid);

        var then = [{
            event: "FullGameJoinAttempted",
            id: genid,
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

        var genid = testMethod.uuid();

        var given = [
            testMethod.eventCreateGame("Ragnar", testMethod.testName, "X", genid)
        ];

        var when = testMethod.cmdJoinGame("", testMethod.testName, "O", genid);

        var then = [{
            event: "NoUserNameJoin",
            id: genid,
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

        var genid = testMethod.uuid();

        var given = [
            testMethod.eventCreateGame("Ragnar", testMethod.testName, "X", genid)
        ];

        var when = testMethod.cmdJoinGame("Kiddi", "", "O", "1337");

        var then = [{
            event: "JoinNoNameProvided",
            id: "1337",
            user: {
                userName: "Kiddi"
            },
            name: "",
            timeStamp: testMethod.testTimeStamp,
            side: "O"
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents).eql(then);
    });

    it('should emit no game name join event', function() {

        var genid = testMethod.uuid();

        var given = [
            testMethod.eventCreateGame("Ragnar", testMethod.testName, "X", "1")
        ];

        var when = testMethod.cmdJoinGame("Kiddi", testMethod.testName, "O", "1919");

        var then = [{
            event: "NoGameWithThisId",
            id: "1919",
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
});

/*

it('should emit player moved event', function() {

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents).eql(then);
    });

 */