'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('POST /api/joinGame', function() {
    it('should respond with event in JSON array', function(done) {

        var req = request(app);

        var given = {
            id: "123",
            cmd: "JoinGame",
            user: {
                userName: "Krummi"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        };

        req
            .post('/api/joinGame')
            .type('json')
            .send(given)
            .end(
                function(err, res) {
                    if (err) {
                        return done(err);
                    }
                    res.body.should.be.instanceof(Array);
                    done();
                });
    });
});