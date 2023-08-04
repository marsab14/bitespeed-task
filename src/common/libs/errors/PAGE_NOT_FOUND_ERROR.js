const BaseError = require('./BaseError');

class PAGE_NOT_FOUND_ERROR extends BaseError {
    constructor(error) {
        const code = 'PAGE_NOT_FOUND_ERROR';
        const statusCode = 404;
        const message = 'internal server error occured';
        super({code, statusCode, message, error})
    }
}

module.exports = PAGE_NOT_FOUND_ERROR;