'use strict';

function ItemsController($scope, items, socketService) {
    var vm = this;

    vm.items = items;

    socketService.onNewBidder(function (item) {
        var idx = -1;
        for (var l = vm.items.length; l > 0; l--) {
            if (vm.items[l - 1].id === item.id) {
                idx = l - 1;
                break;
            }
        }
        if (idx > -1) {
            $scope.$apply(function () {
                vm.items[idx] = item;
            });
        }
    });
}

module.exports = ItemsController;