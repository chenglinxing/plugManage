import service from "./request"

/**用户注册*/
export const userRegister = (params) =>
    service.post({
        url: "/user/userRegister",
        data: params
    })

/**用户登录*/
export const userLoginIn = (params) =>
    service.post({
        url: "/user/userLoginIn",
        data: params
    })

/**获取近3月的活跃用户*/
export const getActiveUser = () =>
    service.get({
        url: "/user/getActiveUser"
    })

/**用户累计注册总数：用户当月注册总数*/
export const getCountRegUser = () =>
    service.get({
        url: "/user/getCountRegUser"
    })