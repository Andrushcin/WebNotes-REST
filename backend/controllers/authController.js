const User = require('./../dbManage/user')
const Token = require('./../dbManage/token')
const UserService = require('./../service/userService')
//const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = "SECRET_KEY"

const generateAccessToken = (id, email, roles) => {
    const payload = {
        id,
        email,
        roles
    }
    return jwt.sign(payload, "SECRET_KEY", {expiresIn: "24h"} )
}

class authController {
    async registration(req, res, next) {
        try {
            const {email, password} = req.body;
            //console.log(email, password)
            const userData = await UserService.registration(email, password);
            //console.log(userData)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
            return res.json(userData);

        } catch (e) {
            console.log(e)
            res.json({statusRegistration: "error"})
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            let user;
            User.findByEmail(email, (err, rows, next) => {
                if (err) return next(err)
                if (rows.length == 0) {
                    return res.json({statusLogin: "userNotExist"})
                } else {  
                    user = rows[0];
                    ifExist()
                }
            });
            function ifExist() {
                const validPassword = bcrypt.compareSync(password, user.password)
                if (!validPassword) {
                    return res.json({statusLogin: "invalidPassword"})
                }
                const token = generateAccessToken(user._id, user.email, user.roles)
                return res.json({statusLogin: "success", token: token, email: email, role: user.roles})
            }
        } catch (e) {
            console.log(e)
            res.json({statusLogin: "error"})
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
            //console.log(activationLink)
            await UserService.activate(activationLink);
            return {"message":"activated"}
        } catch (e) {

        }
    }

    async refresh(req, res, next) {
        try {

        } catch (e) {

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

    async getUsers(req, res) {
        try {
            if (req.user.role == 'admin') {
                User.all((err, rows, next) => {
                    if (err) return next(err) 
                    return res.json({status: "success", users: rows})
                });
            } else {
                return res.json({status: "NoPermission"})
            }
        } catch (e) {
            console.log(e)
            res.json({status: "error"})
        }
    }

    async deleteUserByEmail(req, res) {
        try {
            let email = req.body.email;
            User.deleteByEmail(email, (err) => {
                if (err) return next(err)
                res.json({message:"Пользователь удалён"})
            })
        } catch (e) {
            console.log(e)
        }
    }

    async deleteUserById(req, res) {
        try {
            let id = req.body.id;
            User.deleteById(id, (err) => {
                if (err) return next(err)
                res.json({message:"Пользователь удалён"})
            })
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new authController();