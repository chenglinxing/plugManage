import axios from "axios"

import {
    baseUrl
} from "./baseUrl"
import {
    Message
} from "element-ui"

const service = axios.create({
    baseURL: baseUrl,
    timeout: 500000,
})

/**请求拦截 */
service.interceptors.request.use(
    config => {
        return config
    },
    err => {

        Promise.reject(err)
    }
)

// /**响应拦截 */
service.interceptors.response.use(
    (responce) => {
        let res = responce.data;
        let code = [500, 404, 403, 401]
        if (!code.includes(res.code)) return responce
    },
    (error) => {
        Message({
            showClose: true,
            message: "网络错误,请稍后重试",
            type: "error"
        })
        return Promise.reject(error)
    }
)

service.interceptors.request.use()


/**
 * @description Get 请求
 * @param {Object} request 
 */
service.get = (request) =>
    new Promise((resolve, reject) => {
        service({
                ...request,
                method: 'get'
            })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })

/**POST请求 */
service.post = (request) =>
    new Promise((resolve, reject) => {
        service({
                ...request,
                method: 'post'
            })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })



export default service