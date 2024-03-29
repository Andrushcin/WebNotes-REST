const User = require('./../dbManage/user')
const Token = require('./../dbManage/token')
const UserService = require('./../service/userService')
const tokenService = require('./../service/tokenService');
const { ErrorInfo } = require('./../service/errorService');
//const { validationResult } = require('express-validator')
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errs = require('../localErrors');

class authController {
    async registration(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await UserService.registration(email, password);
            return res.json(userData);
        } catch (e) {
            let error = ErrorInfo(e, [errs.UserAlreadyExist, errs.ErrorSendingActivationEmail])
            return res.json({ error: error });
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await UserService.login(email, password);
            return res.json(userData)
        } catch (e) {
            let error = ErrorInfo(e, [errs.UserDoesNotExist, errs.IncorrectPassword])
            return res.json({ error: error });
        }
    }

    async login_anonymous(req, res, next) {
        try {
            const id = uuid.v4();
            const user = await new User(id, null, null, null, true).create();
            let payload = {
                userId: user.id,
            }
            const tokens = tokenService.generateTokens(payload);
            tokenService.saveToken(user.id, tokens.refreshToken);

            const userData = {
                refreshToken: tokens.refreshToken,
                accessToken: tokens.accessToken,
            }
            return res.json(userData)
        } catch (e) {
            let error = ErrorInfo(e, [])
            return res.json({ error: error });
        }
    }

    async logout(req, res, next) {
        try {
            let token = await Token.find("userId", res.userId)
            await token.delete()
            return res.json({status: "TokenDeleted"})
        } catch (e) {
            let error = ErrorInfo(e, [])
            return res.json({ error: error })
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await UserService.activate(activationLink);
            return res.json({ activated: true })
        } catch (e) {
            let error = ErrorInfo(e, [IncorrectActivationLink])
            return res.json({ error: error })
        }
    }

    async refresh(req, res, next) {
        try {
            const token = req.body.refreshToken;
            const tokensPair = await tokenService.refresh(token)
            return res.json(tokensPair)
        } catch (e) {
            let error = ErrorInfo(e, [jwt.TokenExpiredError])
            return res.json({ error: error })
        }
    }

    async test(req, res, next) {
        try {
                
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new authController();