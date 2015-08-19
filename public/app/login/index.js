'use strict';

var angular = require('angular');

angular
    .module('auLogin', [
        'ui.router',
        'auServices'
    ])
    .config(['$stateProvider', require('./config')])
    .controller('LoginController', ['authService', '$state', require('./login-controller')]);