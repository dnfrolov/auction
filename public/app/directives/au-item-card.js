(function (angular) {
    'use strict';

    function auItemCard() {
        return {
            scope: {
                item: '=',
                viewMode: '@'
            },
            replace: true,
            templateUrl: 'views/item-card'
        }
    }

    angular
        .module('auction')
        .directive('auItemCard', [auItemCard]);
})(angular);