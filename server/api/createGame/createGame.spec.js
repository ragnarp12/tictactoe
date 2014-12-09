'use strict';
var should = require('should');
var app = require('../../app');
var request = require('supertest');


describe('POST /api/createGame', function() {
    it('should respond Game created JSON array', function(done) {

        var req = request(app);

        var given = {
            id: "111",
            cmd: "CreateGame",
            user: {
                userName: "Ragnar"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        };

        req
            .post("/api/creategame")
            .type('json')
            .send(given)
            .end(
                function(err, res) {
                    if (err) {
                        return done(err);
                    }

                    res.body.should.be.instanceOf(Array);
                    done();
                })
    });
});