'use strict';

module.exports = function setup(options, imports, register) {

    var models = imports.database.models;

    register(null, {
        services: {
            bidService: require('./bid-service')(models),
            itemService: require('./item-service')(models),
            userService: require('./user-service')(models),
            errors: imports.database.errors
        }
    });
};