(function (angular) {

    function ItemController(item) {
        var vm = this;

        vm.item = item;
    }

    angular
        .module('auction')
        .controller('ItemController', ['item', ItemController]);

})(angular);