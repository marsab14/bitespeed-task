class HttpResponseHandler {
    
    static error(req, res, errorObj, statusCode = 200) {
        const response = {
            success: false,
            error: errorObj
        }

        return res.status(statusCode).json(response)

    }

    static success(req, res, data, statusCode = 200) {
        const response = {
            success: true,
            data
        }

        return res.status(statusCode).json(response)
    }

}

module.exports = HttpResponseHandler