const User = require('./../dbManage/user');
const Token = require('./../dbManage/token');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const emailService = require('./emailService');
const tokenService = require('./tokenService');
const UserDto = require('../controllers/dtos/user-dto');

class UserService {
    async registration(email, password) {
        console.log(email, password);

        let candidate = await User.find("email", email)
        console.log(candidate)
        if (candidate) {
            throw new Error("Пользователь с таким Email уже существует")
        } 
        const hashPassword = bcrypt.hashSync(password, 7);
        const activationLink = uuid.v4();

        const user = await new User(email, hashPassword, activationLink).create()
        //console.log(u)
        const tokens = tokenService.generateTokens({email});
        await new Token(email, tokens.refreshToken).create();
        emailService.sendActivationMail(email, `${process.env.API_URL}/auth/activate/`+activationLink);

        let userData = {
            userId: user._id,
            userEmail: user.email,
            refreshToken: tokens.refreshToken,
            accessToken: tokens.accessToken,
        }
        //console.log({email: email, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken});
        return userData;
    }

        
            //emailService.sendActivationMail(email, activationLink);

            //const userDto = new UserDto(user);
            //const tokens = tokenService.generateTokens({...userDto});
            //tokenService.saveToken(userDto.id, tokens.refreshToken);
    async activate(activationLink) {
        const user = await User.findByActivationLink(activationLink)
        //console.log("activate")
        //console.log(activationLink)
        console.log(user)
        if (!user) {
            throw new Error('Некорректная ссылка активации')
        }
        await User.create(email=user.email, password=user.password, isActivated=true, activationLink=activationLink);
        console.log("end")
    }
}

module.exports = new UserService();