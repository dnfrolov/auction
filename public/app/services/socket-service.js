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

module.exports = socketService;