const User = require('./../dbManage/user')
const Token = require('./../dbManage/token')
const UserService = require('./../service/userService')
const tokenService = require('./../service/tokenService');
//const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserAlreadyExist, IncorrectActivationLink, ErrorSendingActivationEmail } = require('../localErrors');

const generateAccessToken = (id, email, roles) => {
    const payload = {
        id,
        email,
        roles
    }
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "24h"} )
}

class authController {
    async registration(req, res, next) {
        try {
            const {email, password} = req.body;
            console.log(req.body)
            const userData = await UserService.registration(email, password);
            //res.setHeader('Set-Cookie', `refreshToken=${userData.refreshToken}`)
            //res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000});
            return res.json(userData);

        } catch (e) {
            console.log(e)
            if (e instanceof UserAlreadyExist) {
                return res.json({error: e.message})
            }
            if (e instanceof ErrorSendingActivationEmail) {
                return res.json({warning: e.message})
            }
            return res.json({error: "Произошла ошибка на сервере, попробуйте позже"});
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;

            let user = await User.find("email", email)
            if (!user) {
                return res.json({error: "Пользователя с таким email не существует"})
            }

            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.json({error: "Неверный пароль"})
            }

            let payload = {
                email: email,
            }
            const tokens = tokenService.generateTokens(payload);

            await tokenService.saveToken(email, tokens.refreshToken);

            const userData = {
                userId: user._id,
                userEmail: user.email,
                refreshToken: tokens.refreshToken,
                accessToken: tokens.accessToken,
                isActivated: user.isActivated,
            }
            return res.json(userData)
        } catch (e) {
            console.log(e)
            res.json({error: "Произошла ошибка на сервере, попробуйте позже"})
        }
    }

    async logout(req, res, next) {
        try {
            
        } catch (e) {

        }
    }

    async activate(req, res, next) {
        try {
            
            const activationLink = req.params.link;
            await UserService.activate(activationLink);
            return res.json({"message":"activated"})
        } catch (e) {
            if (e instanceof IncorrectActivationLink) {
                return res.json({error: e.message})
            }
        }
    }

    async refresh(req, res, next) {
        try {
            const token = req.body.refreshToken;
            //const refreshToken = Token.find("refreshToken", token)

            const decodedData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            console.log(decodedData)
            let payload = {
                email: decodedData.email,
            }
            const tokens = tokenService.generateTokens(payload);
            tokenService.saveToken(decodedData.email, tokens.refreshToken);
            return res.json({
                refreshToken: tokens.refreshToken,
                accessToken: tokens.accessToken,
            })
        } catch (e) {
            console.log(e)
            return res.json({error: "Произошла ошибка на сервере, попробуйте позже"})
        }
    }

    async test(req, res, next) {
        try {
            res.json({message: "server robit"})
            //let email = 'test@yandex.ru'
            //let password = 'samokal'
            //let activationLink = 'hhjefjekfrfh4iu'
            //let u = await new User(email, password, activationLink).create()
            //console.log(u)
            //const user = await new User("andr0703@yandex.ru", "samokal", "hhjefjekfrfh4iu").create()
            //console.log(user)
            //let token = await new User("andr0703@yex.ru", "samokal", "hhjefjekfrfh4iu").create().catch((err) => {
            //    throw new Error(err.message)
                //console.log(err)
               //e = err
            //})
            let us = await User.find("email", "test@yandex.ru")
            console.log(us)
            if (us) {
                let res = await us.update("password", "ХУЙ")
                console.log(res)
            }

            //    let res = await us.delete().catch((err) => {
            //            throw new Error(err.message)
           //             console.log(err)
            //            e = err
             //       })
             //   console.log(res)
          //  } else {
          //      console.log("array empty")
          //  }
            //console.log(res)
                
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new authController();