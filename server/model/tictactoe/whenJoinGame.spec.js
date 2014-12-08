var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe');
var testMethod = require('./testMethods');

describe('join game command', function() {

    it('should emit game joined event', function() {

        var given = [
            testMethod.createGame("Ragnar")
        ];

        var when = {
            cmd: "JoinGame",
            user: {
                userName: "Kiddi"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        };
        var then = [{
            event: "GameJoined",
            user: {
                userName: "Kiddi"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents).eql(then);
    });

    it('should emit FullGameJoinAttempted event when game full', function() {

        var given = [{
                event: "GameCreated",
                user: {
                    userName: "Ragnar"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29"
            }, {
                event: "GameJoined",
                user: {
                    userName: "Kiddi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29"
            }

        ];
        var when = {
            cmd: "JoinGame",
            user: {
                userName: "Kiddi"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        };
        var then = [{
            event: "FullGameJoinAttempted",
            user: {
                userName: "Kiddi"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents).eql(then);
    });


    it('should emit no username trying join event', function() {

        var given = [
            testMethod.createGame()
        ];

        var when = {
            cmd: "JoinGame",
            user: {
                userName: ""
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        };
        var then = [{
            event: "NoUserNameJoin",
            user: {
                userName: ""
            },
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