'use strict';
var _ = require('lodash');
var app = require('../../app');

exports.index = function(req, res) {
    if (!app.eventStore) {
        app.eventStore = require('../../eventstore/memorystore')();
    }
    var resp = app.eventStore.loadEvents(req.params.id);
    
    if (resp.length === 0)
       res.send(404);

    res.json(resp);
};