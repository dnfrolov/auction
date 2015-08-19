'use strict';

var angular = require('angular');

angular
    .module('auItem', [
        'ui.router',
        'auServices'
    ])
    .config(['$stateProvider', require('./config')])
    .directive('auItemCard', [require('./au-item-card')])
    .controller('ItemController', ['item', 'currentUser', '$scope', 'socketService', require('./item-controller')])
    .controller('ItemsController', ['$scope', 'items', 'socketService', require('./items-controller')]);