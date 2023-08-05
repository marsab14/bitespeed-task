const BaseError = require('./BaseError');


class INVALID_CREDENTIAL_ERROR extends BaseError {
    constructor(msg) {
        const code = 'INVALID_CREDENTIALS';
        const statusCode = 401;
        const message = msg ? msg : 'Invalid Credentilas';
        const key = 'ums';
        super({code, statusCode, message, key})
    }
}

module.exports = INVALID_CREDENTIAL_ERROR;