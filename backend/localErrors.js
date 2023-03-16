
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

module.exports = { UserAlreadyExist, IncorrectActivationLink };
