const jwt = require('jsonwebtoken');
const Token = require('./../dbManage/token');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30s'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30m'})
        return {
            accessToken,
            refreshToken
        }
    }
    async saveToken(userId, refreshToken) {
        let token = await Token.find("userId", userId);
        if (token) {
            await token.update("refreshToken", refreshToken)
        } else {
            await new Token(userId, refreshToken).create();
        }
    }
    async refresh(token) {
        const decodedData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        console.log(decodedData)
        let payload = {
            userId: decodedData.userId,
        }
        const tokens = this.generateTokens(payload);
        this.saveToken(decodedData.userId, tokens.refreshToken);
        return {
            refreshToken: tokens.refreshToken,
            accessToken: tokens.accessToken,
        }
    }
}

module.exports = new TokenService();
