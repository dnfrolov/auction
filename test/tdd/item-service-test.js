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
            }).then(done, done);
        });

        it('should return id, name, description, image, createdAt, userId, biddersCount, bidders', _test(require('./case1')));
        it('should return single bidder', _test(require('./case2')));
        it('should return many bidders', _test(require('./case3')));

    });
});