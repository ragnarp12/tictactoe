'use strict';

exports.createGame = function(username) {
    return {
        event: "GameCreated",
        user: {
            userName: username
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29"
    };
};

exports.joinGame = function(username) {
    return {
        event: "GameJoined",
        user: {
            userName: username
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29"

    };
};