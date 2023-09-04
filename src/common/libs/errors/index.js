const INTERNAL_SERVER_ERROR = require('./INTERNAL_SERVER_ERROR')
const PAGE_NOT_FOUND_ERROR = require('./PAGE_NOT_FOUND_ERROR')
const BaseError = require('./BaseError')
const DATA_BASE_ERROR = require('./DATABASE_ERROR')



module.exports = {
    BaseError,
    INTERNAL_SERVER_ERROR,
    PAGE_NOT_FOUND_ERROR,
    DATA_BASE_ERROR,

}