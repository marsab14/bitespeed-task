const BaseError = require('./BaseError');


class RESOURCE_ALREADY_EXISTS extends BaseError {
    constructor(msg) {
        const code = 'RESOURCE_ALREADY_EXISTS';
        const statusCode = '200';
        const message = msg ? msg : 'Resource Already Exists, Please try different Email';
        const key = 'ums';
        super({code, statusCode, message, key})
    }
}

module.exports = RESOURCE_ALREADY_EXISTS;