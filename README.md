## Simple Auction web site

You can find it running at https://desolate-eyrie-6667.herokuapp.com.

### Features overview
* simple sing in
* auction items overview
* auction item detail view
* ability to place a bid
* RESTful API to manage **User**, **Item**, **Bid**
* real-time bid placement

### Architecture overview
Project consists of front-end and back-end parts.

Back-end is divided into 3 modules: *db*, *business*, *apps*. *db* is responsible for database communication. *business* provides abstraction level on *db* implementation. *apps* consumes *business* to provide RESTful API and to initialize server with http and socket support.

### Stack

#### Back-End
* Node.js
* architect
* config
* express
* Sequelize
* socket.io

#### Front-End
* AngularJS
* semantic-ui
* socket.io

### How can I run it locally
It assumes Node.js installed.

* clone repository
* exec `npm install`
* exec `npm start`
