'use strict';

var angular = require('angular');

angular
    .module('auServices', [
        'ngResource',
        'btford.socket-io'
    ])
    .factory('Item', ['$resource', require('./item')])
    .factory('User', ['$resource', require('./user')])
    .factory('authService', ['User', require('./auth-service')])
    .factory('socketService', ['socketFactory', require('./socket-service')]);