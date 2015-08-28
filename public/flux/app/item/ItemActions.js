'use strict';

var Reflux = require('reflux');
var request = require('superagent');

var ItemActions = Reflux.createActions({
    'load': {children: ['completed', 'failed']}
});

ItemActions.load.listen(function () {
    request
        .get('/item')
        .end(function (err, res) {
            if (err) {
                this.failed(err);
            } else {
                this.completed(res.body);
            }
        });
});

module.exports = ItemActions;