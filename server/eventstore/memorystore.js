'use strict';

module.exports = function() {
    var store = {};
    return {
        loadEvents: function(id) {
            return store[id] || [];
        },
        loadEventsAll: function() {
            return store || [];
        },
        storeEvents: function(id, events) {
            store[id] = (store[id] || []).concat(events);
        }
    }
}