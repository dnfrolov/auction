'use strict';

var ioApp = require('./io-app');
var expressApp = require('./express-app');

module.exports = function setup(options, imports, register) {
    register(null, {
        apps: {
            expressApp: expressApp.bind(null, imports.services),
            ioApp: function (io) {
                ioApp(io, imports.services);
            }
        }
    });
};