'use strict';
var express = require('express');
var router = express.Router();

module.exports = function(eventStore) {
    var controller = require('./gameHistory.Controller')(eventStore);
    router.get('/:id', controller.index);
    return {
        router: router
    }
};