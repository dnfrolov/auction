(function (angular) {
    'use strict';

    angular
        .module('auction', [
            'ui.router',
            'ngResource'
        ])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('items', {
                url: '/',
                views: {
                    '@': {
                        templateUrl: '/views/items',
                        controller: 'ItemsController as vm'
                    }
                },
                resolve: {
                    items: ['itemResource', function (itemResource) {
                        return itemResource.query();
                    }]
                }
            }).state('item', {
                url: '/item/:id',
                views: {
                    '@': {
                        templateUrl: '/views/item',
                        controller: 'ItemController as vm'
                    }
                },
                resolve: {
                    item: ['itemResource', '$stateParams', function (itemResource, $stateParams) {
                        return itemResource.get({id: $stateParams.id});
                    }]
                }
            });

            $urlRouterProvider.otherwise('/');
        }]);

})(angular);