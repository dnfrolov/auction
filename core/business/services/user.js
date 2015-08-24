'use strict';

module.exports = function (models) {
    var User = models.User;
    var self = {
        name: models.User.name
    };


    self.create = function (data) {
        data = data || {};
        return User
            .findOrCreate({where: {name: data.name}})
            .spread(function (user) {
                return {
                    id: user.id,
                    name: user.name
                };
            });
    };

    return self;
};