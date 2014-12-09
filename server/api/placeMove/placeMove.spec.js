'use strict';
var should = require('should');
var app = require('../../app');
var request = require('supertest');
describe('POST /api/placeMove', function() {
    it('should respond with event in JSON array', function(done) {
        var command = {
            id: "123",
            cmd: "MovePlayer",
            user: {
                userName: "Gulli"
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