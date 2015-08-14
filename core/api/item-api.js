'use strict';

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
        });
    };

    return api;
};

module.exports.__module = {
    args: ['model/item', 'model/user']
};