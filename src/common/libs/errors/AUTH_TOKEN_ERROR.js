const BaseError = require('./BaseError');


class AUTH_TOKEN_ERROR extends BaseError {
    constructor(msg) {
        const code = 'AUTH_TOKEN_ERROR';
        const statusCode = '401';
        const message = msg ? msg : 'Access Token Expired';
        const key = 'ums';
        super({code, statusCode, message, key})
    }
}

module.exports = AUTH_TOKEN_ERROR;