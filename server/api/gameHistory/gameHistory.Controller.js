'use strict';
var _ = require('lodash');
var app = require('../../app');

// gameHistory
module.exports = function(eventStore) {
    return {
        index: function(req, res) {
            eventStore.loadEvents(req.params.id).then(function(events) {
                if(events.length === 0)
            		res.send(404);
                res.json(events);
            }, function(err) {
                res.json(err);
            });
        }
    }
}