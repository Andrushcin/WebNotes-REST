const User = require('./../dbManage/user');
const Token = require('./../dbManage/token');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const emailService = require('./emailService');
const tokenService = require('./tokenService');
const { UserAlreadyExist, IncorrectActivationLink, ErrorSendingActivationEmail, UserDoesNotExist, IncorrectPassword } = require('../localErrors');

class UserService {
    async registration(email, password) {
        
        let candidate = await User.find("email", email)
        if (candidate) {
            throw new UserAlreadyExist(email)
        } 
        const hashPassword = bcrypt.hashSync(password, 7);
        const activationLink = uuid.v4();

        const user = new User(uuid.v4(), email, hashPassword, activationLink);
        let payload = {
            userId: user.id,
        }
        const tokens = tokenService.generateTokens(payload);
        tokenService.saveToken(user.id, tokens.refreshToken);

        await emailService.sendActivationMail(email, `${process.env.APP_URL}/auth/activate/`+activationLink);

        await user.create()
        let userData = {
            userId: user.id,
            email: user.email,
            refreshToken: tokens.refreshToken,
            accessToken: tokens.accessToken,
            isActivated: user.isActivated,
        }
        return userData;
    }

    async login(email, password) {
        let user = await User.find("email", email)
            if (!user) {
                throw new UserDoesNotExist(email)
            }

            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                throw new IncorrectPassword()
            }

            let payload = {
                userId: user.id,
            }
            const tokens = tokenService.generateTokens(payload);
            tokenService.saveToken(user._id, tokens.refreshToken);

            const userData = {
                userId: user.id,
                email: user.email,
                refreshToken: tokens.refreshToken,
                accessToken: tokens.accessToken,
                isActivated: user.isActivated,
            }
            return userData
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