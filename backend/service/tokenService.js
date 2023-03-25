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
    async refresh(token) {
        const decodedData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        console.log(decodedData)
        let payload = {
            email: decodedData.email,
        }
        const tokens = this.generateTokens(payload);
        this.saveToken(decodedData.email, tokens.refreshToken);
        return {
            refreshToken: tokens.refreshToken,
            accessToken: tokens.accessToken,
        }
    }
}

module.exports = new TokenService();
