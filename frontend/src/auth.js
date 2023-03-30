/* eslint-disable */
import {$authHost, $host} from "./http";
import errs from "./errors";

const throwErrorsFromResponse = (responseData) => {
    if (responseData.error) {
        const errName = responseData.error.name;
        for (let err in errs) {
            if (err == errName) {
                throw new errs[err]
            }
        }
        throw new errs.UnknownError()
    }
}

const RefreshIfExpired = async (f, params, obj) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken || !accessToken) {
            throw new errs.UserIsNotAuthorized()
        }
        let response = await f(...params)
        let result = await response.data
        throwErrorsFromResponse(result);
        return response
    } catch (e) {
        switch (e.name) {
            case errs.TokenExpiredError.name:
                try {
                    let data = {
                        refreshToken: localStorage.getItem('refreshToken')
                    };
                    let responseRefresh = await $authHost.post("/auth/refresh", data)
                    let resultRefresh = await responseRefresh.data
                    throwErrorsFromResponse(resultRefresh);
                    localStorage.setItem('refreshToken', resultRefresh.refreshToken)
                    localStorage.setItem('accessToken', resultRefresh.accessToken)
                    return await f(...params)
                } catch (e) {
                    if (e instanceof errs.TokenExpiredError) {
                        localStorage.clear()
                        obj.$router.push({ name: "SignIn" })
                        obj.$emit("alertMessage", {message: "Пожалуйста, войдите в аккаунт", type: "warning"})
                        break
                    } 
                }

            case errs.UserIsNotAuthorized.name:
                localStorage.clear()
                obj.$router.push({ name: "SignIn" })
                obj.$emit("alertMessage", {message: "Пожалуйста, войдите в аккаунт", type: "warning"})
                break
            
            default:
                obj.$emit("alertMessage", {message: "Произошла ошибка, попробуйте позже", type: "warning"})
        }
    }
}

const loginAnonymous = async (obj) => {
    let response = await $host.post("/auth/login_anonymous")
    let result = await response.data
    if (result.error) {
        obj.$emit("alertMessage", {message: "Произошла ошибка, попробуйте позже", type: "warning"})
    } else {
        localStorage.setItem('refreshToken', result.refreshToken)
        localStorage.setItem('accessToken', result.accessToken)
        obj.$router.push({ name: "MyNotes" })
    }
}

export {
    RefreshIfExpired,
    loginAnonymous,
}
