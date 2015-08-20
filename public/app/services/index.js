'use strict';

var angular = require('angular');

angular
    .module('auServices', [
        'ngResource',
        'btford.socket-io'
    ])
    .factory('User', ['$resource', require('./user')])
    .factory('authService', ['User', require('./auth-service')])
    .factory('socketService', ['socketFactory', require('./socket-service')]);