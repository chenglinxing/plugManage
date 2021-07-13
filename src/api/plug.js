import service from "./request.js"

/**新增插件 */
export const insertPlug = (params) =>
    service.post({
        url: "/plug/insertPlug",
        data: params
    })

/**查询所有插件 包括分页及模糊查询 */
export const selectPlug = (plugName, plugLink, insertPlugDate, pageNo, pageSize) =>
    service.get({
        url: `/plug/selectPlug?plugName=${plugName}&plugLink=${plugLink}&insertPlugDate=${insertPlugDate}&pageNo=${pageNo}&pageSize=${pageSize}`,
    })

/**获取所有的插件类型 */
export const getAllPlugType = () =>
    service.get({
        url: '/plug/getAllPlugType'
    })


/**根据插件id查询详情 */
export const getOnePlug = (plugId) =>
    service.get({
        url: `/plug/getOnePlug?plugId=${plugId}`
    })

/**根据插件id修改详情信息 */
export const updatePlugById = (params) =>
    service.post({
        url: '/plug/updatePlugById',
        data: params
    })

/**根据插件id 删除信息  （只修改isDel）*/
export const deletePlugById = (plugId) =>
    service.get({
        url: `/plug/deletePlugById?plugId=${plugId}`
    })

/**获取所有的插件类型 带分页 */
export const getAllPlugTypePag = (plugTypeId, plugTypeName, addTypeTime, pageNo, pageSize) =>
    service.get({
        url: `/plug/getAllPlugTypePag?plugTypeId=${plugTypeId}&plugTypeName=${plugTypeName}&addTypeTime=${addTypeTime}&pageNo=${pageNo}&pageSize=${pageSize}`
    })

/**新增插件类型  */
export const insertPlugType = (params) =>
    service.post({
        url: "/plug/insertPlugType",
        data: params
    })


/**根据插件类型id 获取详情 */
export const getPlugTypeInfoById = (plugTypeId) =>
    service.get({
        url: `/plug/getPlugTypeInfoById?plugTypeId=${plugTypeId}`
    })

/**根据插件类型id 修改详情信息 */
export const updatePlugInfoById = (params) =>
    service.post({
        url: '/plug/updatePlugInfoById',
        data: params
    })

/**根据插件类型删除  只改isDel */
export const deletePlugInfoById = (plugTypeId) =>
    service.get({
        url: `/plug/deletePlugInfoById?plugTypeId=${plugTypeId}`
    })