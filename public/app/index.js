'use strict';

var angular = require('angular');

require('./services');
require('./login');
require('./item');

var app = angular
    .module('auction', [
        'ui.router',
        'auServices',
        'auLogin',
        'auItem'
    ])
    .config(['$urlRouterProvider', function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    }]);