'use strict';

var Sequelize = require('sequelize');

module.exports = function (dbString) {
    return new Sequelize(dbString, {
        define: {
            freezeTableName: true
        }
    });
};