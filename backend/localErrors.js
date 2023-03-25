
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

class IncorrectPassword extends Error {
    constructor() {
        this.message = `Неверный пароль`;
        super(message);
        this.name = "IncorrectPassword";
    }    
}

class IncorrectActivationLink extends Error {
    constructor() {
        let message = 'Некорректная ссылка активации';
        super(message);
        this.name = "IncorrectActivationLink";
    }    
}

class ErrorSendingActivationEmail extends Error {
    constructor() {
        let message = `Вы зарегистрированы! Однако выслать письмо с ссылкой для активации аккаунта не удалось. 
        Попробуйте активировать аккаунт позже в личном кабинете.`;
        super(message);
        this.name = "ErrorSendingActivationEmail";
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

module.exports = { UserAlreadyExist, IncorrectActivationLink, ErrorSendingActivationEmail, UserIsNotAuthorized, UnknownError, UserDoesNotExist, IncorrectPassword };
