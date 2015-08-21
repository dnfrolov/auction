'use strict';

var _ = require('lodash');
var should = require('should');
var sequelizeFixtures = require('sequelize-fixtures');

module.exports = function (imports) {
    describe('item-service', function () {
        var itemService;
        var database;

        before(function () {
            itemService = imports.app.getService('services').itemService;
            database = imports.app.getService('database');
        });

        it('should have method #findById', function () {
            itemService.should.have.a.property('findById').and.be.a.Function;
        });

        it('should have method #findAll', function () {
            itemService.should.have.a.property('findAll').and.be.a.Function;
        });

        describe('methods', function () {

            beforeEach(function () {
                return database.db.sync({force: true});
            });

            describe('#findById', function () {

                function test(tCase) {
                    return function () {
                        return sequelizeFixtures.loadFixtures(tCase.fixtures, database.models).then(function () {
                            return itemService.findById(tCase.expected.id);
                        }).then(function (item) {
                            should(item).eql(tCase.expected);
                        });
                    };
                }

                it('should return null for not found', function () {
                    return itemService.findById(1).then(function (item) {
                        should(item).be.null;
                    });
                });

                it('should return id, name, description, image, createdAt, userId, biddersCount, bidders', test(require('./case1')));
                it('should return single bidder', test(require('./case2')));
                it('should return many bidders', test(require('./case3')));
            });

            describe('#findAll', function () {
                it('should return empty array if there is nothing in db', function () {
                    return itemService.findAll().then(function (items) {
                        should(items).eql([]);
                    });
                });

                it('should return items', function () {
                    var case4 = require('./case4');
                    return sequelizeFixtures.loadFixtures(case4.fixtures, database.models).then(function () {
                        return itemService.findAll();
                    }).then(function (items) {
                        should(items).eql(case4.expected);
                    });
                });
            });
        });
    });
};