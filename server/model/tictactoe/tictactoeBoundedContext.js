'use strict';

var _ = require('lodash');
module.exports = function(eventStore, commandHandler) {
    return {
        handleCommand: function(cmd) {
            var eventStream = eventStore.loadEvents(cmd.id);
            var events = commandHandler(eventStream).executeCommand(cmd);
            //console.log(events);
            eventStore.storeEvents(cmd.id, events);
            return events;
        }
    }
}