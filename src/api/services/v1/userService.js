const { DATA_BASE_ERROR, RESOURCE_ALREADY_EXISTS } = require('../../../common/libs/errors');
// const UserModel = require('../../models/index')
const UserModel = require('../../models/userModel')

const insertUser = async (data) => {
    
    try {   
        console.log("type is", typeof(UserModel))
        const check = await UserModel.findOne({loginId: data.loginId})
        console.log("check is", check)
        if(check) {
            throw new RESOURCE_ALREADY_EXISTS()
        }
        const user = await UserModel.create(data)
        return user;
    } catch(error) {
        if(error) {
            throw error;
        }
        throw new DATA_BASE_ERROR()
    }

}

const findUserByLoginId = (loginId) => {
    try {
        let user = UserModel.findOne({loginId: loginId}).lean()
        return user;
    } catch(error) {
        throw new DATA_BASE_ERROR()
    }
}


module.exports = {
    insertUser, findUserByLoginId
}