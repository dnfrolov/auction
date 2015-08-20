'use strict';

var angular = require('angular');

angular
    .module('auLogin', [
        'ui.router',
        'auServices'
    ])
    .config(['$stateProvider', require('./config-states')])
    .controller('LoginController', ['authService', 'notifyService', require('./login-controller')]);