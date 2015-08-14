'use strict';

var Scatter = require('scatter');
var scatter = new Scatter();

scatter.registerParticles([
    __dirname + '/core/*',
    __dirname + '/app'
]);

scatter.load('express-app').then(function (app) {
    app().listen(3001);
}).catch(function (err) {
    console.log(err, err.stack);
});