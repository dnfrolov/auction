'use strict';

var Reflux = require('reflux');
var ItemActions = require('./ItemActions');

var ItemStore = Reflux.createStore({
    init: function () {
        this.items = [];
        this.listenTo(ItemActions.load, this.onLoadCompleted)
    },
    onLoadCompleted: function (items) {
        this.items = items;
        this.trigger(this.items);
    }
});