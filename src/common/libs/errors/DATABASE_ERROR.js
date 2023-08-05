const BaseError = require('./BaseError');


class DATA_BASE_ERROR extends BaseError {
    constructor(msg) {
        const code = 'DATA_BASE_ERROR';
        const statusCode = 502;
        const message = msg ? msg : 'Error while querying table in database';
        const key = 'ums';
        super({code, statusCode, message, key})
    }
}

module.exports = DATA_BASE_ERROR;