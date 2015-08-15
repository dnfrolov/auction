(function (angular) {
    'use strict';

    angular
        .module('auction', [
            'ui.router',
            'ngResource'
        ])
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
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
                })
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
                        items: ['itemResource', function (itemResource) {
                            return itemResource.query().$promise;
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
                        item: ['itemResource', '$stateParams', function (itemResource, $stateParams) {
                            return itemResource.get({id: $stateParams.id}).$promise;
                        }]
                    }
                });

            $urlRouterProvider.otherwise('/');
        }]);

})(angular);