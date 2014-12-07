'use strict';

var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe')


describe('move player command', function() {

    it('should emit player moved event', function() {
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

        }];

        var when = {
            cmd: "MovePlayer",
            user: {
                userName: "Ragnar"
            },
            name: "TheFirstGame",
            coord: [0, 0],
            timeStamp: "2014-12-02T11:29:29"
        };

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

        }];

        var when = {
            cmd: "MovePlayer",
            user: {
                userName: "Kiddi"
            },
            name: "TheFirstGame",
            coord: [0, 0],
            timeStamp: "2014-12-02T11:29:29"
        };

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

        }, {
            event: "MoveMade",
            user: {
                userName: "Ragnar"
            },
            name: "TheFirstGame",
            coord: [0, 0],
            timeStamp: "2014-12-02T11:29:29"
        }, {
            event: "MoveMade",
            user: {
                userName: "Kiddi"
            },
            name: "TheFirstGame",
            coord: [0, 1],
            timeStamp: "2014-12-02T11:29:29"
        }, {
            event: "MoveMade",
            user: {
                userName: "Ragnar"
            },
            name: "TheFirstGame",
            coord: [1, 0],
            timeStamp: "2014-12-02T11:29:29"
        }, {
            event: "MoveMade",
            user: {
                userName: "Kiddi"
            },
            name: "TheFirstGame",
            coord: [0, 2],
            timeStamp: "2014-12-02T11:29:29"
        }];

        var when = {
            cmd: "MovePlayer",
            user: {
                userName: "Ragnar"
            },
            name: "TheFirstGame",
            coord: [2, 0],
            timeStamp: "2014-12-02T11:29:29"
        };

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

});


/*

 it('should emit player moved event', function() {

 var actualEvents = tictactoe(given).executeCommand(when);
 should(actualEvents).eql(then);
 });

 */