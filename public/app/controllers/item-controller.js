(function (angular) {

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

        vm.item = item;

        vm.allowPlaceBid = function () {
            return allowPlaceBid(item.bidders, currentUser)
        };
        vm.currentUserId = currentUser.id;

        socketService.joinItem(item);

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

    angular
        .module('auction')
        .controller('ItemController', ['item', 'currentUser', '$scope', 'socketService', ItemController]);

})(angular);