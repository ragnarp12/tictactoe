'use strict';

// Development specific configuration
// ==================================
module.exports = {
    // MongoDB connection options
    mongo: {
        uri: 'mongodb://admin:tictacadmin@ds063330.mongolab.com:63330/tictactoe-dev'
    },
    /*
    Þetta á að vera
    eventstore: '/eventstore/mongostore/mongostore',
    seedDB: true
    */
    eventstore: '/eventstore/memorystore/memorystore',
    seedDB: false
};