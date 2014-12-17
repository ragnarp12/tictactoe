'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/gameHistory', function() {
    it('should respond with 404', function(done) {
        request(app)
            .get('/api/gameHistory/11111111')
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                console.log(res);
                done();
            });
    });
});