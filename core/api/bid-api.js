'use strict';

module.exports = function (Bid) {
    return Object.create(Bid);
};

module.exports.__module = {
    args: ['model/bid']
};