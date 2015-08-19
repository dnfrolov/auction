'use strict';

function LoginController(authService, $state) {
    var vm = this;

    vm.singIn = function () {
        vm.loading = true;

        authService.login({
            name: vm.name
        }).then(function () {
            $state.go('items');
        }).finally(function () {
            vm.loading = false;
        });
    };
}

module.exports = LoginController;