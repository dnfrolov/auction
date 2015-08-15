(function (angular) {
    'use strict';

    function Item($resource) {
        return $resource('/item/:id');
    }

    function User($resource) {
        return $resource('/user/:id');
    }


    angular
        .module('auction')
        .factory('Item', ['$resource', Item])
        .factory('User', ['$resource', User]);

})(angular);