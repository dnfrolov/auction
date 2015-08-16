'use strict';

var path = require('path');
var http = require('http');
var config = require('config');
var socket  = require('socket.io');
var architect = require("architect");
var architectConfig = architect.loadConfig(path.join(__dirname, './architect-config.js'));

architect.createApp(architectConfig, function (err, app) {
    if (err) {
        console.log(err, err.stack);
        throw err;
    }


    var apps = app.getService('apps');

    var eApp = apps.expressApp();
    var server = http.Server(eApp);

    var io = socket(server);
    apps.ioApp(io);

    var port = config.get('port');
    server.listen(port);
    console.log('listening on port: ' + port);
});