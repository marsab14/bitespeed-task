const BaseError = require('./BaseError');


class UNAUTH_ERROR extends BaseError {
    constructor(msg) {
        const code = 'UNAUTH_ERROR';
        const statusCode = '403';
        const message = msg ? msg : 'Unauthenticated Access Detected';
        const key = 'ums';
        super({code, statusCode, message, key})
    }
}

module.exports = UNAUTH_ERROR;