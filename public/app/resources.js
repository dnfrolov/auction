(function (angular) {
    'use strict';

    angular
        .module('auction')
        .factory('itemResource', ['$resource', function ($resource) {
            return $resource('/item/:id');
        }])
        .factory('Bid', ['$resource', function ($resource) {
            return $resource('/bid/:id');
        }])
        .factory('User', ['$resource', function ($resource) {
            return $resource('/user/:id');
        }]);

})(angular);