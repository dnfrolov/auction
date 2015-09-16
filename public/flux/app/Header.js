'use strict';

var React = require('react');

var Header = React.createClass({
    render: function () {
        return (
            <div className="ui large secondary pointing menu">
                <a className="active item">Items</a>
            </div>
        );
    }
});


module.exports = Header;