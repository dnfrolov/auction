'use strict';

var _ = require('lodash');

module.exports = function (Bid, User, events) {

    function emitNewBidder(io, bid) {
        return User
            .findById(bid.userId, {alone: true})
            .then(function (user) {
                io.to(roomName(bid.itemId)).emit(events.newBidder ,user);
            }).catch(function (err) {
                console.log(err);
            });
    }

    function onCreateBid(io, rawBid){
        Bid
            .create(rawBid)
            .then(_.partial(emitNewBidder, io))
            .catch(function (err) {
                console.log(err);
            });
    }

    function onJoin(socket, item) {
        socket.join(roomName(item.id));
    }

    function roomName(id) {
        return 'room_' + id;
    }

    return function (io) {
        io.on('connection', function (socket) {
            socket.on(events.joinItem, _.partial(onJoin, socket));
            socket.on(events.createBid, _.partial(onCreateBid, io));
        });
    };
};

module.exports.__module = {
    args: ['bid-api', 'user-api', 'events']
};