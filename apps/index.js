'use strict';

var ioApp = require('./io-app');

module.exports = function setup(options, imports, register) {
    register(null, {
        apps: {
            expressApp: require('./express-app').bind(null, imports.services),
            ioApp: function (io) {
                ioApp(io, imports.services);
            }
        }
    });
};