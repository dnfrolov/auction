(function (angular) {

    function ItemController(item, Bid) {
        var vm = this;

        vm.item = item;

        vm.placeBid = function () {
            var bid = new Bid({
                userId: 1,
                itemId: item.id
            });
            bid.$save();
        };
    }

    angular
        .module('auction')
        .controller('ItemController', ['item', 'Bid', ItemController]);

})(angular);