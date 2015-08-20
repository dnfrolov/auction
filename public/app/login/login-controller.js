'use strict';

function LoginController(authService, notifyService) {
    var vm = this;

    vm.singIn = function () {
        vm.loading = true;

        authService.login({
            name: vm.name
        }).then(function () {
            notifyService.authorized.auEmit();
        }).finally(function () {
            vm.loading = false;
        });
    };
}

module.exports = LoginController;