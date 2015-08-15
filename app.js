'use strict';

var http = require('http');
var Scatter = require('scatter');
var scatter = new Scatter();
var socket  = require('socket.io');

scatter.registerParticles([
    __dirname + '/core/*',
    __dirname + '/app',
    __dirname + '/shared'
]);

scatter.load('express-app').then(function (expressApp) {
   return scatter.load('io-app').then(function (ioApp) {
       var app = expressApp();
       var server = http.Server(app);

       var io = socket(server);
       ioApp(io);

       server.listen(3001);
   });
}).catch(function (err) {
    console.log(err, err.stack);
});