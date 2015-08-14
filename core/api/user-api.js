'use strict';

module.exports = function (User, Item) {
    var api = Object.create(User);

    api.findById = function (id) {
        return User.findOne({
            where: {
                id: id
            },
            include: {
                model: Item,
                as: 'bids'
            }
        });
    };

    return api;
};

module.exports.__module = {
    args: ['model/user', 'model/item']
};