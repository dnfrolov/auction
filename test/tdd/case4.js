module.exports = {
    "fixtures": [
        {
            "model": "User",
            "data": {
                "id": 1,
                "name": "dmitry"
            }
        },
        {
            "model": "User",
            "data": {
                "id": 2,
                "name": "alex"
            }
        },
        {
            "model": "User",
            "data": {
                "id": 3,
                "name": "mark"
            }
        },
        {
            "model": "Item",
            "data": {
                "id": 1,
                "name": "item1",
                "description": "description1",
                "image": "image1.jpg",
                "userId": 1,
                "createdAt": new Date('2014-02-03 11:00:00')
            }
        },
        {
            "model": "Item",
            "data": {
                "id": 2,
                "name": "item2",
                "description": "description1",
                "image": "image1.jpg",
                "userId": 2,
                "createdAt": new Date('2014-02-03 11:00:00')
            }
        },
        {
            "model": "Item",
            "data": {
                "id": 3,
                "name": "item3",
                "description": "description1",
                "image": "image1.jpg",
                "createdAt": new Date('2014-02-03 11:00:00')
            }
        },
        {
            "model": "Bid",
            "data": {
                "userId": 1,
                "itemId": 1
            }
        },
        {
            "model": "Bid",
            "data": {
                "userId": 2,
                "itemId": 1
            }
        },
        {
            "model": "Bid",
            "data": {
                "userId": 3,
                "itemId": 1
            }
        },
        {
            "model": "Bid",
            "data": {
                "userId": 3,
                "itemId": 2
            }
        },
        {
            "model": "Bid",
            "data": {
                "userId": 2,
                "itemId": 2
            }
        }
    ],
    "expected": [
        {
            "id": 1,
            "name": "item1",
            "description": "description1",
            "image": "image1.jpg",
            "userId": 1,
            "createdAt": new Date('2014-02-03 11:00:00'),
            "biddersCount": 3
        },
        {
            "id": 2,
            "name": "item2",
            "description": "description1",
            "image": "image1.jpg",
            "userId": 2,
            "createdAt": new Date('2014-02-03 11:00:00'),
            "biddersCount": 2
        },
        {
            "id": 3,
            "name": "item3",
            "description": "description1",
            "image": "image1.jpg",
            "createdAt": new Date('2014-02-03 11:00:00'),
            "userId": null,
            "biddersCount": 0
        }
    ]
};