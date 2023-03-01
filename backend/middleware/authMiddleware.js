const jwt = require('jsonwebtoken')
const secret = "SECRET_KEY"

module.exports = function () {
    return function (req, res, next) {
        console.log(req.headers.authorization)
        if (!req.headers.authorization) {
            req.user = false;
            console.log("no header")
            next()
        }
        else {
            try {
                const token = req.headers.authorization.split(' ')[1]
                const decodedData = jwt.verify(token, secret)
                console.log(decodedData)
                req.user = {
                    email: decodedData.email,
                    role: decodedData.roles,
                    token: decodedData.token
                }
                next()
            } catch (e) {
                req.user = false;
                console.log(e)
                next()
            }
        }
    }
};
