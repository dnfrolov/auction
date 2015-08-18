'use strict';

var _ = require('lodash');

module.exports = function (models) {
    var Item = models.Item;
    var User = models.User;
    var self = Object.create(Item);

    function allowedFields(data) {
        return {
            name: data.name,
            description: data.description,
            image: data.image
        };
    }

    self.findById = function (id) {
        return Item.findOne({
            where: {
                id: id
            },
            include: [{
                model: User,
                as: 'bidders',
                attributes: ['id', 'name']
            }]
        }).then(function (item) {
            if (item) {
                var i = item.get({plain: true});
                i.biddersCount = i.bidders.length;
                i.bidders = _.map(i.bidders, _.partialRight(_.pick, ['id', 'name']));
                return i;
            }
            return null;
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

    //!NOTE deny set userId (owner) for new Item
    self.create = function (data) {
        return Item.create(allowedFields(data));
    };

    //!NOTE deny set userId (owner)
    self.update = function (data, opts) {
        return Item.update(allowedFields(data), opts);
    };

    return self;
};