'use strict';

function authService(User) {
    var currentUser;

    return {
        login: function (data) {
            return User.save(data).$promise.then(function (user) {
                currentUser = user;
            });
        },
        currentUser: function () {
            return currentUser;
        }
    };
}

module.exports = authService;