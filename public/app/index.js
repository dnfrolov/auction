'use strict';

var angular = require('angular');

require('./services');
require('./login');
require('./item');

angular
    .module('auction', [
        'ui.router',
        'auServices',
        'auLogin',
        'auItem'
    ])
    .config(['$urlRouterProvider', function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    }]).run(['$state', 'notifyService', function ($state, notifyService) {

        notifyService.authorized.auSubscribe(null, function () {
            $state.go('item.index');
        });

        notifyService.unAuthorized.auSubscribe(null, function () {
            $state.go('login');
        });
    }]);