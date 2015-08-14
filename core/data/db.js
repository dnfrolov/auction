'use strict';

var config = require('config');
var Sequelize = require('sequelize');

var dbConfig = config.get('db');

module.exports = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    define: {
        freezeTableName: true
    }
});