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

Back-end is divided into 3 modules: **db**, **business**, **apps**. **db** is responsible for database communication. **business** provides abstraction level on **db** implementation. **apps** consumes **business** to provide RESTful API and to initialize server with http and socket support.

There is **shared** folder. it's supposed to be used on both side: front-end and back-end. To accomplish that front-end must be move to use browserify.

### Stack

#### Back-End
* Node.js
* architect
* config
* express
* MySQL
* Sequelize
* socket.io

#### Front-End
* AngularJS
* semantic-ui
* socket.io

#### Utilities
* grunt
* browserify

#### Test
* mocha
* should

### How can I run it locally
It assumes Node.js and MySql installed.
Nodemon is used to restart application when you change backend files.
Browserify watches you frontend files and keeps bundle up to date.

* clone repository
* set env variable **PORT** 
* set env variable **DATABASE_URL** - connection string to db - `mysql://user:pass@localhost:3306/dbname`
* exec `npm install`
* exec `grunt dev`

### Tests
* run - `npm test`
* coverage - `npm run coverage`
