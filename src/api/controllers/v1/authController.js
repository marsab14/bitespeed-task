const { INTERNAL_SERVER_ERROR, INVALID_CREDENTIAL_ERROR } = require("../../../common/libs/errors");
const bcrypt = require('bcrypt')
const UserService = require('../../services/v1/userService');
const AuthManager = require("../../../common/libs/authmanager");

const login = async (data) => {

    const user = await UserService.findUserByLoginId(data.loginId);
    const result = await bcrypt.compare(data.password, user.password)
    if(result) {
        let data = {...user}
        token = await AuthManager.issueTokens(data)
        delete data["password"]
        return Object.freeze({
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
            userId: data._id,
            roles: []
        })
    } else {
        throw new INVALID_CREDENTIAL_ERROR()
    }
    

}

const signup = async (data) => {
    let { loginId, password } = data;
    password = await bcrypt.hash(password, 10)
    return UserService.insertUser({loginId, password})
}

module.exports = {
    login, signup
}