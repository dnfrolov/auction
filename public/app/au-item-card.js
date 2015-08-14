(function (angular) {
    angular
        .module('auction')
        .directive('auItemCard', [function () {
            return {
                scope: {
                    item: '=',
                    viewMode: '@'
                },
                replace: true,
                templateUrl: 'views/item-card'
            }
        }]);
})(angular);