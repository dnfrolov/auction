'use strict';

function configStates($stateProvider) {

    var base = {
        name: 'item',
        abstract: true,
        template: '<div ui-view="viewIndex"/>',
        resolve: {
            currentUser: ['authService', function (authService) {
                return authService.currentUser();
            }]
        },
        onEnter: ['currentUser', 'notifyService', function (currentUser, notifyService) {
            if (!currentUser) {
                notifyService.unAuthorized.auEmit();
            }
        }]
    };

    var overview = {
        name: 'item.index',
        url: '/item',
        parent: base,
        views: {
            'viewIndex': {
                template: require('./views/items.jade'),
                controller: 'ItemsController as vm'
            }
        },
        resolve: {
            items: ['Item', function (Item) {
                return Item.query().$promise;
            }]
        }
    };

    var detail = {
        name: 'item.detail',
        url: '/item/:id',
        parent: base,
        views: {
            'viewIndex': {
                template: require('./views/item.jade'),
                controller: 'ItemController as vm'
            }
        },
        resolve: {
            item: ['Item', '$stateParams', function (Item, $stateParams) {
                return Item.get({id: $stateParams.id}).$promise;
            }]
        }
    };

    $stateProvider
        .state(base)
        .state(overview)
        .state(detail);
}

module.exports = configStates;