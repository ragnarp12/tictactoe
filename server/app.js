/**
 * Main application file
 */
'use strict';

console.debug = console.log;

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('express');
var config = require('./config/environment');

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app, config);
var mongoose = require('mongoose');

// Connect to database
console.log("Connecting to mongoDb ", config.mongo.uri, config.mongo.options);
mongoose.connect(config.mongo.uri, config.mongo.options, function(err) {
    console.debug("connect callback", arguments);
});

// Populate DB with sample data
if (config.seedDB) {
    require('./config/seed');
}

// Start server
server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

app.appName = "TicTacToe";

// Expose app
exports = module.exports = app;