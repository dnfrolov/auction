'use strict';

function auItemCard() {
    return {
        scope: {
            item: '=',
            viewMode: '@'
        },
        replace: true,
        templateUrl: 'views/item-card'
    }
}

module.exports = auItemCard;