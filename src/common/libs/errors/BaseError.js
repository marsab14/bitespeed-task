const HttpResponseHandler = require('../../helper/HttpResponseHandler')

class AppError extends Error {
    constructor({code, statusCode, message, key, error = null}) {
        super();
        this.code = code ?? 'UNHANDLED_ERROR';
        this.statusCode = statusCode ?? '200';
        this.message = message ?? 'This Error is not handled';
        this.originalError = error ? error.name : 'ERROR';
        this.key = key ?? 'KEY_UNDEFINED';
        this.stack = error ? error.stack : null;
    }

    async handleError(req, res) {
        const { code, statusCode, message, key, originalError, devError, stack } = this;

        const errObj = {
            code, devError, statusCode, key, message
        };

        HttpResponseHandler.error(req, res, errObj, statusCode);

    }

}

module.exports = AppError;