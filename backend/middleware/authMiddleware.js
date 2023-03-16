const jwt = require('jsonwebtoken')


module.exports = function () {
    return function (req, res, next) {
        console.log(req.headers.authorization)
        if (!req.headers.authorization) {
            req.error = "UserIsNotAuthorized";
            next()
        }
        else {
            try {
                //console.log("header")
                const token = req.headers.authorization.split(' ')[1]
                const decodedData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
                //console.log(decodedData)

                next()
            } catch (e) {
                req.error = "UserIsNotAuthorized";
                console.log(e)
                next()
            }
        }
    }
};
