/* eslint-disable */
class TokenExpiredError extends Error {
    constructor() {
        let message = `TokenExpiredError`;
        super(message);
        this.name = "TokenExpiredError";
    }    
}


class UserAlreadyExist extends Error {
    constructor(userEmail) {
        super(userEmail);
        this.message = `Пользователь с email ${userEmail} уже существует`;
        this.name = "UserAlreadyExist";
    }    
}

class UserDoesNotExist extends Error {
    constructor(email) {
        super(email);
        this.message = `Пользователя с email ${email} не существует`;
        this.name = "UserDoesNotExist";
    }    
}

class UserIsNotAuthorized extends Error {
    constructor() {
        let message = `Вы не авторизованы! Ваши записи удалятся после перезагрузки страницы.`;
        super(message);
        this.name = "UserIsNotAuthorized";
    }    
}

class UnknownError extends Error {
    constructor() {
        let message = `Произошла неизвестная ошибка на сервере, попробуйте позже.`;
        super(message);
        this.name = "UnknownError";
    }    
}

module.exports = { TokenExpiredError, UserAlreadyExist, UserIsNotAuthorized, UnknownError, UserDoesNotExist };
