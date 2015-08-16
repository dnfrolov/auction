'use strict';

var Sequelize = require('sequelize');
var sequelize = require('./db');


module.exports = function setup(options, imports, register) {

    var Item = sequelize.define('item', require('./model/item'));
    Item.sync();

    var User = sequelize.define('user', require('./model/user'));
    User.sync();

    var Bid = sequelize.define('bid', require('./model/bid'));
    Bid.sync();


    User.hasMany(Item, {
        foreignKey: 'userId',
        as: 'items'
    });

    Item.belongsTo(User, {
        foreignKey: 'userId',
        as: 'winner'
    });

    Item.belongsToMany(User, {
        as: 'bidders',
        through: Bid,
        foreignKey: 'itemId'
    });
    User.belongsToMany(Item, {
        as: 'bids',
        through: Bid,
        foreignKey: 'userId'
    });

    register(null, {
        database: {
            db: sequelize,
            errors: {
                ValidationError: Sequelize.ValidationError,
                UniqueConstraintError: Sequelize.UniqueConstraintError
            },
            models: {
                Bid: Bid,
                Item: Item,
                User: User
            }
        }
    })
};