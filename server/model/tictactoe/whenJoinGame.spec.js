var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe')

describe('join game command', function() {

    it('should emit game joined event', function() {

        var given = [{
            event: "GameCreated",
            user: {
                userName: "Ragnar"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        }];
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
        should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
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
            }

        ];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
    });
});