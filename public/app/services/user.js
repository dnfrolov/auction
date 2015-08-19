'use strict';

function User($resource) {
    return $resource('/user/:id');
}

module.exports = User;