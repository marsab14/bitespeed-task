const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    node: {
        hostName: process.env.HOST_NAME,
        hostPort: process.env.HOST_PORT,
        url: `${process.env.HOST_NAME}:${process.env.HOST_PORT}`,
        pathPrefix: `/${process.env.HOST_SERVICE_NAME}/apis`,
        buildNumber: process.env.BUILD_NUMBER
    },
    mongodb: {
        url: process.env.MONGODB_URL
    },
    jwt: {
        tokenSecret: process.env.HS256_TOKEN_SECRET,
        accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRETION,
        refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRETION
    }
}