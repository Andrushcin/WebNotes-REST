import axios from 'axios';
//import errs from "./errors";

const apiUrl = "http://192.168.1.153:5000"

const $host = axios.create({
    baseURL: apiUrl,
    headers: {'Content-Type': 'application/json;charset=utf-8'},
})

const $authHost = axios.create({
    baseURL: apiUrl,
    headers: {'Content-Type': 'application/json;charset=utf-8'},
})

const authInterceptor = config => {
    const accessToken = localStorage.getItem('accessToken');
    config.headers.authorization = `Bearer ${accessToken}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost,
}
