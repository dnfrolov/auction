'use strict';

function config($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/',
            views: {
                '@': {
                    templateUrl: '/views/login',
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