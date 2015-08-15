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
        }])
        .factory('auSocket', ['socketFactory', function (socketFactory) {
            var socket = socketFactory();

            return {
                joinItem: function (item) {
                    socket.emit('joinItem', item);
                },
                createBid: function (bid) {
                    socket.emit('createBid', bid);
                },
                onNewBidder: function (cb) {
                    socket.on('newBidder', cb);
                }
            };
        }])

})(angular);