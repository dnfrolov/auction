'use strict';

module.exports = function (User, Item) {
    var api = Object.create(User);

    api.findById = function (id, opts) {
        opts = opts || {};
        var qOpts = {
            where: {
                id: id
            },
            include: {
                model: Item,
                as: 'bids'
            }
        };

        if (opts.alone) {
            delete qOpts.include;
        }

        return User.findOne(qOpts).then(function (user) {
            return user.get({plain: true});
        });
    };

    api.create = function (data) {
        return User
            .findOrCreate({where: {name: data.name}})
            .spread(function (user, created) {
                return user;
            });
    };

    return api;
};

module.exports.__module = {
    args: ['model/user', 'model/item']
};