var should = require('should');
var _ = require('lodash');

describe('Testing tictactoe context using stubing method.', function() {
    it('should excecute command within the tictactoe implementation with events from the store and store generated events.', function() {

        var eventStoreId;
        var myEvents;

        var stubStore = {
            loadEvents: function(id) {
                eventStoreId = id;
                return [];
            },
            storeEvents: function(id, events) {
                myEvents = events;
            }
        };

        var myCommand = {};

        var tictactoe = function(history) {
            return {
                executeCommand: function(cmd) {
                    myCommand = cmd;
                    return [];
                }
            }
        };

        var handlers = tictactoe;
        var boundedContext = require('./tictactoeBoundedContext')(stubStore, handlers);

        var givenCommand = {
            id: '19919'
        };

        var events = boundedContext.handleCommand(givenCommand);

        should(myCommand.id).be.exactly('19919');
        should(eventStoreId).be.exactly('19919');
        should(events.length).be.exactly(0);
        should(myEvents).eql(events);
    });
});