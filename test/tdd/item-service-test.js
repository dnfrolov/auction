'use strict';

process.env.NODE_ENV = 'test';

var _ = require('lodash');
var path = require('path');
var should = require('should');
var architect = require('architect');
var sequelizeFixtures = require('sequelize-fixtures');
var architectConfig = architect.loadConfig(path.join(__dirname, '../../architect-config.js'));

var database;
var itemService;

//load services from architect
before(function (done) {
    architect.createApp(architectConfig, function (err, app) {
        if (err) {
            done(err);
        } else {
            database = app.getService('database');
            itemService = app.getService('services').itemService;
            done();
        }
    });
});

function loadFixtures(fixtures) {
    return function (done) {
        return _loadFixtures(fixtures).then(done).catch(done);
    };
}

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

        it('should return null for not found', function (done) {
            itemService.findById(1).then(function (item) {
                should(item).be.null;
            }).then(done, done);
        });

        //case1
        it('should return id, name, description, image, userId, biddersCount, bidders', function (done) {
            var case1 = require('./case1.json');
            _loadFixtures(case1.fixtures).then(function () {
                return itemService.findById(case1.expected.id);
            }).then(function (item) {
                should(item).have.properties(case1.expected);
                done();
            }, done);
        });

        //case2
        it('should return single bidder', function (done) {
            var case2 = require('./case2.json');
            _loadFixtures(case2.fixtures).then(function () {
                return itemService.findById(case2.expected.id);
            }).then(function (item) {
                item.should.have.properties(case2.expected);
                done();
            }).catch(done);
        });

        //case3
        //it('should return many bidders', function (done) {
        //    var case3 = require('./case3.json');
        //    _loadFixtures(case3.fixtures)
        //});

    });
});