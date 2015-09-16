'use strict';

var React = require('react');

//todo add navigation, add datefilter
var Item = React.createClass({
    render: function () {
        return (
            <div className="ui green card">
                <div className="image">
                    <img height="300" src={this.props.item.image} />
                </div>
                <div className="content">
                    <div className="header">
                        <span>{this.props.item.name}</span>
                    </div>
                    <div className="meta">
                        <span className="date">Created at {this.props.item.createdAt}</span>
                    </div>
                    <div className="description">
                        <p>{this.props.item.description}</p>
                    </div>
                </div>
                <div className="extra content">
                    <div className="ui compact menu">
                        <a className="item">
                            <i className="icon users"></i> Auction Room
                            <span className="floating ui teal label">{this.props.item.biddersCount}</span>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Item;