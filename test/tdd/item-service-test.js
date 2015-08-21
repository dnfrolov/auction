'use strict';

process.env.NODE_ENV = 'test';

var _ = require('lodash');
var path = require('path');
var should = require('should');
var architect = require('architect');
var sequelizeFixtures = require('sequelize-fixtures');
var architectConfig = architect.loadConfig(path.join(__dirname, '../../architect-config.js'));

var database;
var errors;
var userService;
var itemService;

//load services from architect
before(function (done) {
    architect.createApp(architectConfig, function (err, app) {
        if (err) {
            done(err);
        } else {
            database = app.getService('database');
            var services = app.getService('services');
            errors = services.errors;
            itemService = services.itemService;
            userService = services.userService;
            done();
        }
    });
});

function _loadFixtures(fixtures) {
    return database.db.sync({force: true}).then(function () {
        return sequelizeFixtures.loadFixtures(fixtures, database.models);
    });
}

describe('item-service', function () {

    it('should have method #findById', function () {
        itemService.should.have.a.property('findById').and.be.a.Function;
    });

    describe('#findById', function () {

        function _test(tCase) {
            return function (done) {
                _loadFixtures(tCase.fixtures).then(function () {
                    return itemService.findById(tCase.expected.id);
                }).then(function (item) {
                    should(item).eql(tCase.expected);
                    done();
                }).catch(done);
            };
        }

        it('should return null for not found', function (done) {
            itemService.findById(1).then(function (item) {
                should(item).be.null;
                done();
            }).catch(done);
        });

        it('should return id, name, description, image, createdAt, userId, biddersCount, bidders', _test(require('./case1')));
        it('should return single bidder', _test(require('./case2')));
        it('should return many bidders', _test(require('./case3')));

    });

    it('should have method #findAll', function () {
        itemService.should.have.a.property('findAll').and.be.a.Function;
    });

    describe('#findAll', function () {
        it('should return empty array if there is nothing in db', function (done) {
            database.db.sync({force: true}).then(function () {
                return itemService.findAll();
            }).then(function (items) {
                should(items).eql([]);
                done();
            }).catch(done);
        });

        it('should return items', function (done) {
            var case4 = require('./case4');
            _loadFixtures(case4.fixtures).then(function () {
                return itemService.findAll();
            }).then(function (items) {
                should(items).eql(case4.expected);
                done();
            }).catch(done);
        });
    });
});

describe('user-service', function () {

    beforeEach(function (done) {
        database.db.sync({force: true}).then(function () {
            done();
        });
    });

    it('should have method #create', function () {
        userService.should.have.a.property('create').and.be.a.Function;
    });

    describe('#create', function () {

        function testValidation(rawUser) {
            return function (done) {
                userService.create(rawUser).then(function () {
                    done(new Error())
                }).catch(function (err) {
                    should(err).exist;
                    err.should.be.an.instanceOf(errors.ValidationError);
                    err.should.have.property('errors').and.be.an.Array;
                    err.errors.length.should.be.above(0);
                    err.errors.forEach(function (error) {
                        error.should.have.property('message').and.be.a.String;
                    });
                    done();
                });
            };
        }


        it('should return validation errors for null passed', testValidation(null));
        it('should return validation errors for missing name', testValidation({}));

        it('should create user', function (done) {
            var rawUser = {name: 'alex'};
            userService.create(rawUser).then(function (user) {
                should(user).exist;
                user.should.have.properties(rawUser);
                done();
            }).catch(done);
        });

        it('should find user', function (done) {
            var rawUser = {name: 'alex'};
            userService.create(rawUser).then(function () {
                return userService.create(rawUser);
            }).then(function (user) {
                should(user).exist;
                user.should.have.properties(rawUser);
                done();
            }).catch(done);
        });
    });


});