'use strict';

var Sequelize = require('sequelize');

module.exports = function (dbString) {
    return new Sequelize(dbString, {
        logging: false,
        define: {
            freezeTableName: true
        }
    });
};