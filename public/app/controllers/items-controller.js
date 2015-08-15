(function (angular) {
    'use strict';

    function ItemsController(items) {
        var vm = this;

        vm.items = items;
    }

    angular
        .module('auction')
        .controller('ItemsController', ['items', ItemsController]);

})(angular);