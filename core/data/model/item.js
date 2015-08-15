'use strict';

var Sequelize = require('sequelize');

module.exports = function (sequelize) {
    var Item = sequelize.define('item', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                len: [5, 50]
            }
        },
        description: {
            type: Sequelize.STRING(250),
            allowNull: true,
            validate: {
                len: [5, 250]
            }
        },
        image: {
            type: Sequelize.STRING(250),
            allowNull: true,
            validate: {
                len: [0, 50]
            }
        }
    });

    Item.sync();
    return Item;
};

module.exports.__module = {
    args: ['db']
};