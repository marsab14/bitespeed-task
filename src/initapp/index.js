
const  MongoDatabase  = require('../common/database/mongodb');
const { testDbConnection } = require('../common/database/postgres');


const init = async () => {
   const mongoConnection = new MongoDatabase();
    await mongoConnection.connect();
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