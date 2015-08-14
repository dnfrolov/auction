'use strict';

var Sequelize = require('sequelize');

module.exports = function () {
    return {
        ValidationError: Sequelize.ValidationError,
        UniqueConstraintError: Sequelize.UniqueConstraintError
    };
};