'use strict';

module.exports = function (baseRouter, Item, User) {
    var models = Array.prototype.slice.call(arguments, 1);

    return function (app) {

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
};

module.exports.__module = {
    args: ['base-router', 'model/item', 'model/user']
};