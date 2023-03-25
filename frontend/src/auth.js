/* eslint-disable */
import {$authHost} from "./http";

const RefreshIfExpired = async (f, params) => {

    let response = await f(...params)
    let result = await response.data
    if (result.error.name == "TokenExpiredError") {
        let data = {
            refreshToken: localStorage.getItem('refreshToken')
        };
        let response = await $authHost.post("/auth/refresh", data)
        let result = await response.data
        localStorage.setItem('refreshToken', result.refreshToken)
        localStorage.setItem('accessToken', result.accessToken)
        return await f(...params)
    } else {
        return response
    }
}

export {
    RefreshIfExpired,
}