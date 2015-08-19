'use strict';

function auItemCard() {
    return {
        scope: {
            item: '=',
            viewMode: '@'
        },
        replace: true,
        template: require('./views/item-card.html')
    }
}

module.exports = auItemCard;