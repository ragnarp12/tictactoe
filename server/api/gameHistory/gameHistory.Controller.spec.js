'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/gameHistory', function() {
    it('should respond with JSON array', function(done) {
        request(app)
            .get('/api/gameHistory/111')
            .expect(200)
            .type('json')
            .end(function(err, res) {
                if (err) return done(err);

                res.body.should.be.instanceof(Array);
                done();
            });
    });
});