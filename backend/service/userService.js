const User = require('./../dbManage/user');
const Token = require('./../dbManage/token');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const emailService = require('./emailService');
const tokenService = require('./tokenService');
const { UserAlreadyExist, IncorrectActivationLink, ErrorSendingActivationEmail } = require('../localErrors');

class UserService {
    async registration(email, password) {
        
        let candidate = await User.find("email", email)
        if (candidate) {
            throw new UserAlreadyExist(email)
        } 
        const hashPassword = bcrypt.hashSync(password, 7);
        const activationLink = uuid.v4();

        const user = await new User(email, hashPassword, activationLink).create();
        let payload = {
            email: email,
        }
        const tokens = tokenService.generateTokens(payload);
        tokenService.saveToken(email, tokens.refreshToken);

        await emailService.sendActivationMail(email, `${process.env.API_URL}/auth/activate/`+activationLink);


        let userData = {
            userId: user._id,
            userEmail: user.email,
            refreshToken: tokens.refreshToken,
            accessToken: tokens.accessToken,
            isActivated: user.isActivated,
        }
        return userData;
    }

    async activate(activationLink) {
        const user = await User.find("activationLink", activationLink)
        console.log(user)
        if (!user) {
            throw new IncorrectActivationLink()
        }
        await user.update("isActivated", true);
    }
}

module.exports = new UserService();