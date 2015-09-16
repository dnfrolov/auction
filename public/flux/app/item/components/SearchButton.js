'use strict';

var React = require('react');

var SearchButton = React.createClass({
    render: function () {
        return (
            <div className="ui left icon action input">
                <i className="search icon"></i>
                <input type="text" placeholder="Search..."/>
                <button className="ui blue submit button">Search</button>
            </div>
        );
    }
});

module.exports = SearchButton;