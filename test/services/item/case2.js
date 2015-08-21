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
    }
  ],
  "expected": {
    "id": 1,
    "name": "item2",
    "description": "description1",
    "image": "image1.jpg",
    "userId": 1,
    "createdAt": new Date('2014-02-03 11:00:00'),
    "biddersCount": 1,
    "bidders": [{
      "id": 1,
      "name": "dmitry"
    }]
  }
};