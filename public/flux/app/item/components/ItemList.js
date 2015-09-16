'use strict';

var React = require('react');
var Item = require('./Item');
var SearchButton = require('./SearchButton');
var ItemActions = require('../ItemActions');
var ItemStore = require('../ItemStore');

var data = [{
    "id": 1,
    "name": "item1",
    "description": null,
    "image": "/assets/images/image1.jpg",
    "createdAt": "2015-08-20T08:53:16.000Z",
    "userId": null,
    "biddersCount": 0
}, {
    "id": 2,
    "name": "item2",
    "description": null,
    "image": "/assets/images/image2.jpg",
    "createdAt": "2015-08-20T08:53:23.000Z",
    "userId": null,
    "biddersCount": 0
}, {
    "id": 3,
    "name": "item3",
    "description": null,
    "image": "/assets/images/image3.jpg",
    "createdAt": "2015-08-20T08:53:29.000Z",
    "userId": 1,
    "biddersCount": 1
}];

//todo add search
var ItemList = React.createClass({
    componentDidMount: function () {
        ItemActions.load();
        ItemStore.listen(this.onItemLoad);
    },

    onItemLoad: function (items) {
        this.setState({items: items});
    },

    getInitialState: function () {
        return {
            items: []
        }
    },
    render: function () {
        var items = data.map(function (item) {
            return <Item key={item.id} item={item} />
        });
        return (
            <div className="ui one column grid">
                <div className="right aligned column">
                    <SearchButton />
                </div>
                <div className="column">
                    <div className="ui cards">
                        {items}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ItemList;