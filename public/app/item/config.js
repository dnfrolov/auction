'use strict';

function config($stateProvider) {
    $stateProvider
        .state('items', {
            url: '/items',
            views: {
                '@': {
                    templateUrl: '/views/items',
                    controller: 'ItemsController as vm'
                },
                'navView': {
                    templateUrl: '/views/nav'
                }
            },
            resolve: {
                items: ['Item', function (Item) {
                    return Item.query().$promise;
                }],
                currentUser: ['authService', function (authService) {
                    return authService.currentUser();
                }]
            },
            onEnter: ['currentUser', '$state', function (currentUser, $state) {
                if (!currentUser) {
                    $state.go('login');
                }
            }]
        })
        .state('items.item', {
            url: '/:id',
            views: {
                '@': {
                    templateUrl: '/views/item',
                    controller: 'ItemController as vm'
                }
            },
            resolve: {
                item: ['Item', '$stateParams', function (Item, $stateParams) {
                    return Item.get({id: $stateParams.id}).$promise;
                }]
            }
        });
}

module.exports = config;