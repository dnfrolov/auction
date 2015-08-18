'use strict';

var config = require('config');
var Sequelize = require('sequelize');
var dbString = process.env.DATABASE_URL || process.env.CLEARDB_DATABASE_URL || config.get('db');
var sequelize = require('./db')(dbString);

module.exports = function setup(options, imports, register) {

    var Item = sequelize.define('item', require('./model/item'));
    var User = sequelize.define('user', require('./model/user'));
    var Bid = sequelize.define('bid', require('./model/bid'));

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

    sequelize.sync().then(function () {
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
        });
    });
};