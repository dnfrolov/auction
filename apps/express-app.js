'use strict';

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var registerRoutes = require('./routes');
var errors = require('./errors');

module.exports = function (services) {
    var app = express();

    app.set('views', path.resolve(__dirname + '/../public/views'));
    app.set('view engine', 'jade');

    app.use(express.static(path.resolve(__dirname + '/../public')));

    app.use(bodyParser.json());

    app.use(function (err, req, res, next) {
        res.status(400).send(new errors.InvalidJsonError());
    });

    registerRoutes(app, services);

    return app;
};