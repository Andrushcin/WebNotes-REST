const jwt = require('jsonwebtoken')
const { ErrorInfo } = require('./../service/errorService');
const errs = require('./../localErrors');

module.exports = function () {
    return function (req, res, next) {
        try {
            if (!req.headers.authorization) {
                throw new errs.UserIsNotAuthorized()
            }
            const token = req.headers.authorization.split(' ')[1]
            const decodedData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            res.userId = decodedData.userId;
            console.log(decodedData.userId)
            next()
        } catch (e) {
            let error = ErrorInfo(e, [errs.UserIsNotAuthorized, jwt.TokenExpiredError, jwt.JsonWebTokenError])
            return res.json({ error: error });
        }
    }
};
