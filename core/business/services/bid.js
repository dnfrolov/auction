'use strict';

module.exports = function (models) {
    return {
        name: models.Bid.name,
        create: function (data) {
            return models.Bid.create(data);
        }
    };
};