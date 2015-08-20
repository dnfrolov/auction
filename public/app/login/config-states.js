'use strict';

function configStates($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/',
            views: {
                '@': {
                    template: require('./views/login.jade'),
                    controller: 'LoginController as vm'
                }
            },
            onEnter: ['authService', 'notifyService', function (authService, notifyService) {
                if (authService.currentUser()) {
                    notifyService.authorized.auEmit();
                }
            }]
        });
}

module.exports = configStates;