(function (angular) {
    'use strict';

    angular
        .module('auction')
        .factory('itemResource', ['$resource', function ($resource) {
            return $resource('/item/:id');
        }]);

})(angular);