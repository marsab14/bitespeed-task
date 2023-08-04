
const  MongoDatabase  = require('../common/database/mongodb')

const init = async () => {
   // const mongoConnection = new MongoDatabase();
    //mongoConnection.connect();


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