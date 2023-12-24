const CustomAPIError = require('./custom-error');
const {StatusCodes} = require('http-status-codes'); // easier to read what's happening

class UnauthenticatedError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    };
}

module.exports = UnauthenticatedError;