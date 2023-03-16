import axios from 'axios'

const apiUrl = "http://localhost:7000"

const $host = axios.create({
    baseURL: apiUrl,
    headers: {'Content-Type': 'application/json;charset=utf-8'},
})

const $authHost = axios.create({
    baseURL: apiUrl,
    headers: {'Content-Type': 'application/json;charset=utf-8'},
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost,
}
