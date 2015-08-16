'use strict';

var config = require('config');
var Sequelize = require('sequelize');

var dbString = process.env.DATABASE_URL || process.env.CLEARDB_DATABASE_URL || config.get('db');

module.exports = new Sequelize(dbString, {
    define: {
        freezeTableName: true
    }
});