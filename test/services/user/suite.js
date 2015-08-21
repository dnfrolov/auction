'use strict';

var should = require('should');
var sequelizeFixtures = require('sequelize-fixtures');

module.exports = function (imports) {
    describe('user-service', function () {
        var userService;
        var errors;
        var database;

        before(function () {
            userService = imports.services.userService;
            errors = imports.services.errors;
            database = imports.database;
        });

        it('should have method #create', function () {
            userService.should.have.a.property('create').and.be.a.Function;
        });

        describe('methods', function () {
            beforeEach(function () {
                return database.db.sync({force: true});
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

                it('should create user', function () {
                    var rawUser = {name: 'alex'};
                    return userService.create(rawUser).then(function (user) {
                        should(user).exist;
                        user.should.have.properties(rawUser);
                    });
                });

                it('should find user', function () {
                    var case5 = require('./case1');
                    return sequelizeFixtures.loadFixtures(case5.fixtures, database.models).then(function () {
                        return userService.create(case5.income);
                    }).then(function (user) {
                        should(user).exist;
                        user.should.eql(case5.expected);
                    });
                });
            });
        });
    });
};