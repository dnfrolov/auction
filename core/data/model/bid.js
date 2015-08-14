'use strict';

var Sequelize = require('sequelize');

module.exports = function (sequelize, User, Item) {
    var Bid = sequelize.define('bid', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER,
            unique: 'user_item',
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        itemId: {
            type: Sequelize.INTEGER,
            unique: 'user_item',
            allowNull: false,
            references: {
                model: Item,
                key: 'id'
            }
        }
    });

    Item.belongsToMany(User, {
        as: 'bids',
        through: Bid,
        foreignKey: 'itemId'
    });
    User.belongsToMany(Item, {
        as: 'bidders',
        through: Bid,
        foreignKey: 'userId'
    });

    Bid.sync();
    return Bid;
};

module.exports.__module = {
    args: ['db', 'model/User', 'model/Item']
};