const mongoose = require('mongoose')
const { MongooseIdAssigner, FieldConfigTypes } = require('mongoose-id-assigner');

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    loginId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    lastLogin: {
        type: Date,
        default: () => new Date()
    }
})

const userModelOptions = {
    modelName : 'User',
    separator: '-',
    fields: {
        userId: {
            type: FieldConfigTypes.String,
            nextId: 'USR-0000000'
        }
    }
}

const userIA = new MongooseIdAssigner(UserSchema, userModelOptions);
const User = mongoose.model('User', UserSchema)

module.exports = User;