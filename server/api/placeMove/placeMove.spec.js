'use strict';
var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('POST /api/placeMove', function() {
    it('should respond not allowed to move', function(done) {
        var create = {
            id: "123",
            cmd: "CreateGame",
            user: {
                userName: "Ragnar"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29",
            side: "X"
        };

        var join = {
            id: "123",
            cmd: "JoinGame",
            user: {
                userName: "Kiddi"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29",
            side: "O"
        };

        var move1 = {
            id: "123",
            cmd: "MovePlayer",
            user: {
                userName: "Ragnar"
            },
            name: "TheFirstGame",
            coord: [0, 1],
            timeStamp: "2014-12-02T11:29:29",
            side: "X"
        }

        var move2 = {
            id: "123",
            cmd: "MovePlayer",
            user: {
                userName: "Ragnar"
            },
            name: "TheFirstGame",
            coord: [0, 0],
            timeStamp: "2014-12-02T11:29:29",
            side: "X"
        }

        var then = [{
            "event": "MovePlayerAttempted",
            "id": "123",
            "user": {
                "userName": "Ragnar"
            },
            "name": "TheFirstGame",
            "coord": [0,0],
            "timeStamp": "2014-12-02T11:29:29",
            "side": "X"
        }];


        var req = request(app);
        req
            .post('/api/createGame')
            .type('json')
            .send(create)
            .end(function(err, res) {
                if (err) return done(err);

                var req2 = request(app);
                req2
                    .post('/api/joinGame')
                    .type('json')
                    .send(join)
                    .end(function(err2, res2) {
                        if (err2) return done(err2)

                        var req3 = request(app);
                        req3
                            .post('/api/placeMove')
                            .type('json')
                            .send(move1)
                            .end(function(err3, res3) {
                                if (err3) return done(err3);
                                var req4 = request(app);
                                req4
                                    .post('/api/placeMove')
                                    .type('json')
                                    .send(move2)
                                    .end(function(err4, res4) {
                                        if (err4) return done(err4);

                                        res4.text.should.equal(JSON.stringify(then));
                                        done();
                                    });
                                //done();

                            });
                        //done();
                    });
                //done();
            });
    });

    it('should respond with event in JSON array', function(done) {
        var command = {
            id: "123",
            cmd: "MovePlayer",
            user: {
                userName: "Ragnar"
            },
            name: "TheFirstGame",
            coord: [0, 0],
            timeStamp: "2014-12-02T11:29:29",


        };

        var req = request(app);
        req
            .post('/api/placeMove')
            .type('json')
            .send(command)
            .end(function(err, res) {
                if (err) return done(err);
               
                res.body.should.be.instanceof(Array);
                done();
            });
    });
});