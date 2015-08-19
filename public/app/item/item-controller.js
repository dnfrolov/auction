'use strict';

function allowPlaceBid(bidders, currentUser) {
    for (var i = bidders.length; i > 0; i--) {
        if (bidders[i-1].id === currentUser.id) {
            return false;
        }
    }
    return true;
}

function ItemController(item, currentUser, $scope, socketService) {
    var vm = this;
    socketService.joinItem(item);

    vm.item = item;
    vm.allowPlaceBid = function () {
        return allowPlaceBid(item.bidders, currentUser)
    };

    vm.currentUserId = currentUser.id;

    vm.placeBid = function () {
        socketService.createBid({
            userId: currentUser.id,
            itemId: item.id
        });
    };

    socketService.onNewBidder(function (item) {
        $scope.$apply(function () {
            vm.item = item;
        });
    });
}

module.exports = ItemController;