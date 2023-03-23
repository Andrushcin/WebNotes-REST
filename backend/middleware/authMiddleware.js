const jwt = require('jsonwebtoken')

//const NotAuthorizedMessage = `Вы не авторизованы! Ваши записи удалятся после перезагрузки страницы.`;

module.exports = function () {
    return function (req, res, next) {
        //console.log(req.headers.authorization)
        if (!req.headers.authorization) {
            return res.json({error: "UserNotAuthorized"})
        }
        else {
            try {
                const token = req.headers.authorization.split(' ')[1]
                const decodedData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
                res.userEmail = decodedData.email;
                next()
            } catch (e) {
                if (e instanceof jwt.TokenExpiredError) {
                    return res.json({error: "JwtExpired"})
                }
                return res.json({error: "UserNotAuthorized"})
            }
        }
    }
};
