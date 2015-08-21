'use strict';

process.env.NODE_ENV = 'test';

var path = require('path');
var architect = require('architect');
var architectConfig = architect.loadConfig(path.join(__dirname, '../architect-config.js'));

var imports = {};

//load services from architect
before(function (done) {
    architect.createApp(architectConfig, function (err, app) {
        if (err) {
            done(err);
        } else {
            imports.app = app;
            done();
        }
    });
});

require('./services/item/suite')(imports);
require('./services/user/suite')(imports);