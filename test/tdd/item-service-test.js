'use strict';

process.env.NODE_ENV = 'test';

var _ = require('lodash');
var path = require('path');
var should = require('should');
var architect = require('architect');
var sequelizeFixtures = require('sequelize-fixtures');
var architectConfig = architect.loadConfig(path.join(__dirname, '../../architect-config.js'));

var database;
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
        database.db.sync({force: true}).then(done).catch(done);
    });

    it('should have method #create', function () {
        userService.should.have.a.property('create').and.be.a.Function;
    });

    describe('#create', function () {
        it('should return validation errors', function () {

        });

        it('should create user', function () {

        });
    });


});