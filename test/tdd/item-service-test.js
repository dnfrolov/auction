'use strict';

var path = require('path');
var architect = require('architect');
var architectConfig = architect.loadConfig(path.join(__dirname, '../../architect-config.js'));

var architectApp;

before(function (done) {
    architect.createApp(architectConfig, function (err, app) {
        if (err) {
            done(err);
        } else {
            architectApp = app;
            done();
        }
    });
});


describe('item-service', function () {
    //var itemService = architectApp.getService('services').itemService;
    //var db = architectApp.getService('database').db;

    describe('#findById', function () {

        it('should have method findById', function () {
            var itemService = architectApp.getService('services').itemService;
            itemService.should.have.a.property('findById').and.to.be.a.Function;
        });
    });
});