'use strict';

module.exports = function (db, models) {
    return {
        name: models.Bid.name,
        //!NOTE transaction is used to be sure that only one user is able to create a bid and become owen
        create: function (data) {
            return db.transaction(function (t) {
                return models.Bid.create(data, {transaction: t})
                    .then(function (bid) {
                        return models.Item.update({
                            userId: bid.userId
                        }, {
                            transaction: t,
                            where: {
                                id: bid.itemId,
                                userId: null
                            }
                        }).then(function () {
                            return bid;
                        });
                    });
            });
        }
    };
};