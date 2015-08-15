'use strict';

var util = require('util');

function BaseAppError(message) {
    this.message = message;
}

function InvalidJsonError() {
    BaseAppError.call(this, 'Please Use Valid JSON');
}
util.inherits(InvalidJsonError, BaseAppError);

function UnexpectedError() {
    BaseAppError.call(this, 'Unexpected Error Occurred. Please Contact Administrator');
}
util.inherits(UnexpectedError, BaseAppError);


module.exports = {
    InvalidJsonError: InvalidJsonError,
    UnexpectedError: UnexpectedError
};