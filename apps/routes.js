'use strict';

module.exports = function (app, services) {
    var baseRouter = require('./base-router')(services.errors);
    var models = [services.userService, services.itemService];

    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('/views/*', function (req, res) {
        var view = req.url.replace('/views/', '');
        res.render(view);
    });

    models.forEach(function (model) {
        app.use('/' + model.name, baseRouter(model));
    });
};