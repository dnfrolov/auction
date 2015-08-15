(function (angular) {

    function allowPlaceBid(bidders, currentUser) {
        for (var i = bidders.length; i > 0; i--) {
            if (bidders[i-1].id === currentUser.id) {
                return false;
            }
        }
        return true;
    }

    function ItemController(item, currentUser, $scope, auSocket) {
        var vm = this;

        vm.item = item;

        vm.allowPlaceBid = function () {
            return allowPlaceBid(item.bidders, currentUser)
        };
        vm.currentUserId = currentUser.id;

        auSocket.joinItem(item);

        vm.placeBid = function () {
            auSocket.createBid({
                userId: currentUser.id,
                itemId: item.id
            });
        };

        auSocket.onNewBidder(function (bidder) {
            $scope.$apply(function () {
                vm.item.bidders.push(bidder);
            });
        });
    }

    angular
        .module('auction')
        .controller('ItemController', ['item', 'currentUser', '$scope', 'auSocket', ItemController]);

})(angular);