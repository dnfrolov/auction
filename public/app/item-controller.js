(function (angular) {

    function allowPlaceBid(bidders, currentUser) {
        for (var i = bidders.length; i > 0; i--) {
            if (bidders[i-1].id === currentUser.id) {
                return false;
            }
        }
        return true;
    }

    function ItemController(item, currentUser, Bid) {
        var vm = this;

        vm.item = item;

        vm.allowPlaceBid = allowPlaceBid(item.bidders, currentUser);
        vm.currentUserId = currentUser.id;

        vm.placeBid = function () {
            var bid = new Bid({
                userId: currentUser.id,
                itemId: item.id
            });
            bid.$save();
        };
    }

    angular
        .module('auction')
        .controller('ItemController', ['item', 'currentUser', 'Bid', ItemController]);

})(angular);