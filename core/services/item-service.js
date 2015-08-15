'use strict';

var _ = require('lodash');

module.exports = function (models) {
    var Item = models.Item;
    var User = models.User;
    var self = Object.create(Item);

    self.findById = function (id) {
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

    self.findAll = function () {
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

    return self;
};