'use strict';

function Item($resource) {
    return $resource('/item/:id');
}

module.exports = Item;