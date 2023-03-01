const jwt = require('jsonwebtoken');
const Token = require('./../dbManage/token');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userEmail, refreshToken) {
        Token.create(userEmail, refreshToken)
    }
}

module.exports = new TokenService();
