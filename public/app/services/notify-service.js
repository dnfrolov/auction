'use strict';

function notifyService($rootScope) {
    var self = {};
    var events = {
        authorized: 'au-authorized',
        unAuthorized: 'au-unauthorized'
    };

    function eventFactory($rootScope, eventName) {
        return {
            auEmit: function () {
                $rootScope.$emit(eventName);
            },
            auSubscribe: function ($scope, cb) {
                var cleanup = $rootScope.$on(eventName, cb);
                if ($scope) {
                    $scope.$on('$destroy', cleanup);
                }
            }
        };
    }

    for(var event in events) {
        if (events.hasOwnProperty(event)) {
            self[event] = eventFactory($rootScope, events[event]);
        }
    }

    return self;
}

module.exports = notifyService;