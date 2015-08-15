(function (angular) {
    'use strict';

    function socketService(socketFactory) {
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
    }

    angular
        .module('auction')
        .factory('socketService', ['socketFactory', socketService]);

})(angular);