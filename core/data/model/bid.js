'use strict';

var Sequelize = require('sequelize');

module.exports = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.INTEGER,
        unique: 'user_item',
        allowNull: false
    },
    itemId: {
        type: Sequelize.INTEGER,
        unique: 'user_item',
        allowNull: false
    }
};