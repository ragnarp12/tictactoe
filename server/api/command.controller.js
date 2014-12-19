'use strict';

var _ = require('lodash');

var bContext = require('../model/tictactoe/tictactoeBoundedContext');
var handler = require('../model/tictactoe/aggregate/tictactoe');

var app = require('../app');

exports.executeCommand = function(request, response) {
    try {
        if (!app.eventStore) {
            app.eventStore = require('../eventstore/memorystore')();
        }

        var actionStore = app.eventStore;
        var context = bContext(actionStore, handler);
        var result = context.handleCommand(request.body);

        response.json(result);
    } catch (e) {
        response.json(e);
    }
};