'use strict';

module.exports = function setup(options, imports, register) {

    var models = imports.database.models;

    register(null, {
        services: {
            bidService: require('./services/bid')(models),
            itemService: require('./services/item')(models),
            userService: require('./services/user')(models),
            errors: imports.database.errors
        }
    });
};