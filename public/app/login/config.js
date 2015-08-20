'use strict';

function config($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/',
            views: {
                '@': {
                    template: require('./views/login.jade'),
                    controller: 'LoginController as vm'
                }
            },
            onEnter: ['authService', '$state', function (authService, $state) {
                if (authService.currentUser()) {
                    $state.go('items');
                }
            }]
        });
}

module.exports = config;