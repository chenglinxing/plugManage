import service from "./request"

/**获取所有用户 */
export const getAllUser = (userName, userEmail, pageNo, pageSize) =>
    service.get({
        url: `/user/getAllUser?userName=${userName}&userEmail=${userEmail}&pageNo=${pageNo}&pageSize=${pageSize}`
    })

/**根据userId获取用户权限 */
export const getUserRights = (userId) =>
    service.get({
        url: `/user/getUserRights?userId=${userId}`
    })

/**根据menuId获取菜单详情 */
export const getMenuDetail = (menuId) =>
    service.get({
        url: `/user/getMenuDetail?menuId=${menuId}`
    })

/**根据menuId修改菜单部分信息 */
export const updateMenuDetail = (params) =>
    service.post({
        url: '/user/updateMenuDetail',
        data: params
    })

/**根据userId获取用户信息 */
export const getUserInfoByUserId = (userId) =>
    service.get({
        url: `/user/getUserInfoByUserId?userId=${userId}`
    })