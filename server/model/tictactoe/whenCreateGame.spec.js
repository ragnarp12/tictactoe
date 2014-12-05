var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe')

describe('create game command', function() {

    it('should emit no username in game event', function() {
        var given = [];

        var when = {
            cmd: "CreateGame",
            user: {
                userName: ""
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        };

        var then = [{
            event: "GameNoUserName",
            user: {
                userName: ""
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents).eql(then);
    });

    it('should emit no game name in game event', function() {
        var given = [];

        var when = {
            cmd: "CreateGame",
            user: {
                userName: "Ragnar"
            },
            name: "",
            timeStamp: "2014-12-02T11:29:29"
        };

        var then = [{
            event: "GameNoName",
            user: {
                userName: "Ragnar"
            },
            name: "",
            timeStamp: "2014-12-02T11:29:29"
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents).eql(then);
    });

    it('should emit no timestamp in game event', function() {
        var given = [];

        var when = {
            cmd: "CreateGame",
            user: {
                userName: "Ragnar"
            },
            name: "TheFirstGame",
            timeStamp: ""
        };

        var then = [{
            event: "GameNoTimeStamp",
            user: {
                userName: "Ragnar"
            },
            name: "TheFirstGame",
            timeStamp: ""
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents).eql(then);
    });

    it('should emit game created event', function() {

        var given = [];
        var when = {
            cmd: "CreateGame",
            user: {
                userName: "Ragnar"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        };
        var then = [{
            event: "GameCreated",
            user: {
                userName: "Ragnar"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        }];

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents.length).be.exactly(1);

        should(actualEvents).eql(then);
    })



});

/*

it('should emit player moved event', function() {

        var actualEvents = tictactoe(given).executeCommand(when);
        should(actualEvents).eql(then);
    });

 */