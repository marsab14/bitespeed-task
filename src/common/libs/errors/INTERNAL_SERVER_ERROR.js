const BaseError = require('./BaseError');

class INTERNAL_SERVER_ERROR extends BaseError {
    constructor(error) {
        const code = 'INTERNAL_SERVER_ERROR';
        const statusCode = 500;
        const message = 'internal server error occured';
        super({code, statusCode, message, error})
    }
}

module.exports = INTERNAL_SERVER_ERROR;