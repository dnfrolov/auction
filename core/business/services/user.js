'use strict';

module.exports = function (models) {
    var Item = models.Item;
    var User = models.User;
    var self = Object.create(User);

    self.findById = function (id, opts) {
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

    self.create = function (data) {
        data = data || {};
        return User
            .findOrCreate({where: {name: data.name}})
            .spread(function (user, created) {
                return user;
            });
    };

    return self;
};