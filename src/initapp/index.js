const { testDbConnection } = require('../common/database/postgres');


const init = async () => {
    await testDbConnection()

    process.
            on('unhandledRejection', (reason) => {
                console.log(`Unhandled Rejection :: ${reason}`)
            })
            .on('uncaughtException', (error) => {
                console.log(`Uncaught Exception is :: ${error}`)
                process.exit(1);
            })
}

module.exports = init