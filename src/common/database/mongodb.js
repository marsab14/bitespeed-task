const mongoose = require('mongoose')
const config = require("../../config/index")

const { url } = config.mongodb


class MongoDatabase {
    constructor() {
        if(!MongoDatabase.instance) {
            MongoDatabase.instance = this;
        }
        return MongoDatabase.instance;
    }

    static getInstance() {
        return this.instance;
    }

    async connect() {
        mongoose.set('strictQuery', true)
        mongoose.connect(url, {
            //useNewUrlParse: true,
            useUnifiedTopology: true
        })

        const { connection } = mongoose;
        
        connection.on('error', (error) => {
            console.log(`MongoDB Connection Failed :: ${error}`)
        })

        connection.once('open', () => {
            console.log(`Service connected to Mongo DB`)
        })

    }

}


module.exports = MongoDatabase