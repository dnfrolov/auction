'use strict';

var _ = require('lodash');
var express = require('express');
var errors = require('./errors');

module.exports = function (dataErrors) {

    function errorHandler(err, req, res, next) {
        var status = 500;
        var error = new errors.UnexpectedError();

        if (err instanceof dataErrors.UniqueConstraintError) {
            status = 400;
            error = _.map(err.errors, _.partialRight(_.pick, 'message'));
        } else if (err instanceof dataErrors.ValidationError) {
            status = 400;
            error = _.map(err.errors, _.partialRight(_.pick, 'message'));
        } else {
            console.log(err, err.stack);
        }

        res.status(status).send(error);

    }


    return function (Entity) {
        var router = express.Router();

        router.get('/', function (req, res, next) {
            Entity.findAll().then(function (entities) {
                res.send(entities);
            }).catch(next);
        });

        router.get('/:id', function (req, res, next) {
            Entity.findById(req.params.id).then(function (entity) {
                if (entity) {
                    res.send(entity);
                } else {
                    res.status(404).end();
                }
            }).catch(next);
        });

        router.post('/', function (req, res, next) {
            Entity.create(req.body).then(function (entity) {
                res.send({
                    id: entity.id
                });
            }).catch(next);
        });

        router.put('/:id', function (req, res, next) {
            Entity.update(req.body, {
                where: {
                    id: req.params.id
                }
            }).then(function (entity) {
                res.send({
                    id: entity.id
                });
            }).catch(next);
        });

        router.use(errorHandler);

        return router;
    };
};