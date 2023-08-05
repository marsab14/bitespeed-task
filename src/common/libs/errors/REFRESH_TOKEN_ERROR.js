const BaseError = require('./BaseError');


class REFRESH_TOKEN_ERROR extends BaseError {
    constructor(msg) {
        const code = 'REFRESH_TOKEN_ERROR';
        const statusCode = '401';
        const message = msg ? msg : 'Refresh Token Expired';
        const key = 'ums';
        super({code, statusCode, message, key})
    }
}

module.exports = REFRESH_TOKEN_ERROR;