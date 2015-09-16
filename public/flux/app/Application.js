'use strict';

var React = require('react');
var Header = require('./Header');
var ItemList = require('./item/components/ItemList');

var Application = React.createClass({
    render: function () {
        return (
            <div>
                <Header />
                <ItemList />
            </div>
        );
    }
});

module.exports = Application;