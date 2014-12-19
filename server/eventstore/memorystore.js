module.exports = function() {
    var eventStore = {};
    return {
        loadEvents: function(id) {
            return eventStore[id] || [];
        },
        storeEvents: function(id, events) {
            eventStore[id] = (eventStore[id] || []).concat(events);
        }
    }
}