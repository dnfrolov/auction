'use strict';

var Sequelize = require('sequelize');

module.exports = function (sequelize) {
    var User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING(50),
            allowNull: false,
            validate: {
                len: [5, 50]
            }
        }
    });

    User.sync();
    return User;
};

module.exports.__module = {
    args: ['db']
};