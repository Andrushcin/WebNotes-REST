
class UserAlreadyExist extends Error {
    constructor(userEmail) {
        super(userEmail);
        this.message = `Пользователь с email ${userEmail} уже существует`;
        this.name = "UserAlreadyExist";
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

module.exports = { UserAlreadyExist, IncorrectActivationLink, ErrorSendingActivationEmail, UserIsNotAuthorized };
