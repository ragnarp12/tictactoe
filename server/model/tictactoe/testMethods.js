'use strict';

exports.createGame = function() {
    return {
        event: "GameCreated",
        user: {
            userName: "Ragnar"
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29"
    };
};

exports.joinGame = function() {
    return {
        event: "GameJoined",
        user: {
            userName: "Kiddi"
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29"

    };
};