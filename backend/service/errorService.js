const { UnknownError } = require('./../localErrors.js')

// Функция проверяет, предусмотрена ли ошибка для отправки клиенту
// Возвращает только некоторые поля ошибки
const ErrorInfo = (e, userErrors) => { 
    console.log(e)
    if (!userErrors.some((err) => e instanceof err)) {
        e = new UnknownError()
    } 
    return {
        name: e.name,
        message: e.message,
        // ...and over fields
    }
}

module.exports = { ErrorInfo, }