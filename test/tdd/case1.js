'use strict';

module.exports = {
  "fixtures": [
    {
      "model": "Item",
      "data": {
        "id": 1,
        "name": "item1",
        "description": "description1",
        "image": "image1.jpg",
        "createdAt": new Date('2014-02-03 11:00:00')
      }
    }
  ],
  "expected": {
    "id": 1,
    "name": "item1",
    "description": "description1",
    "image": "image1.jpg",
    "createdAt": new Date('2014-02-03 11:00:00'),
    "userId": null,
    "biddersCount": 0,
    "bidders": []
  }
};