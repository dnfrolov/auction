'use strict';

var _ = require('lodash');

module.exports = function (Item, User) {
    var api = Object.create(Item);

    api.findById = function (id) {
        return Item.findOne({
            where: {
                id: id
            },
            include: [{
                model: User,
                as: 'bidders'
            }]
        }).then(function (item) {
            var i = item.get({plain: true});
            i.biddersCount = i.bidders.length;
            return i;
        });
    };

    api.findAll = function () {
        return Item.findAll({
            include: [{
                model: User,
                as: 'bidders'
            }]
        }).then(function (items) {
            return _.map(items, function (item) {
                var i = item.get({plain: true});
                i.biddersCount = i.bidders.length;
                delete i.bidders;
                return i;
            });
        });
    };

    return api;
};

module.exports.__module = {
    args: ['model/item', 'model/user']
};