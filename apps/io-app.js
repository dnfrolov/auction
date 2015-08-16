'use strict';

var _ = require('lodash');
var events = require('../shared/events');

module.exports = function (io, services) {
    var bidService = services.bidService;
    var itemService = services.itemService;

    function emitNewBidder(io, bid) {
        return itemService
            .findById(bid.itemId)
            .then(function (item) {
                io.to(roomName(bid.itemId)).emit(events.newBidder, item);
                io.emit(events.newBidder, item);
            });
    }

    function onCreateBid(io, rawBid){
        bidService
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

    io.on('connection', function (socket) {
        socket.on(events.joinItem, _.partial(onJoin, socket));
        socket.on(events.createBid, _.partial(onCreateBid, io));
    });
};