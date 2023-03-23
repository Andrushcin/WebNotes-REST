const jwt = require('jsonwebtoken');
const Token = require('./../dbManage/token');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '1m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }
    async saveToken(email, refreshToken) {
        let token = await Token.find("userEmail", email);
        if (token) {
            await token.update("refreshToken", refreshToken)
        } else {
            await new Token(email, refreshToken).create();
        }
    }
}

module.exports = new TokenService();
