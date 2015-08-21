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
            "model": "Item",
            "data": {
                "id": 1,
                "name": "item2",
                "description": "description1",
                "image": "image1.jpg",
                "userId": 1,
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
        }
    ],
    "expected": {
        "id": 1,
        "name": "item2",
        "description": "description1",
        "image": "image1.jpg",
        "userId": 1,
        "createdAt": new Date('2014-02-03 11:00:00'),
        "biddersCount": 2,
        "bidders": [
            {
                "id": 1,
                "name": "dmitry"
            },
            {
                "id": 2,
                "name": "alex"
            }
        ]
    }
}