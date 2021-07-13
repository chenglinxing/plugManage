import service from "./request"

/**文件上传*/
export const uploadFile = (params) =>
    service.post({
        url: "/upload/uploadFile",
        data: params
    })

/**文件预览 */
export const previewFile = (fileId) =>
    service.get({
        url: `/upload/previewFile?fileId=${fileId}`
    })

/**用户上传头像 */
export const uploadAvatar = (params) =>
    service.post({
        url: '/upload/uploadAvatar',
        data: params
    })

/**文件下载 */
export const downloadAvatar = (fileId) =>
    service.get({
        url: `/upload/downloadAvatar?fileId=${fileId}`,
        responseType: 'blob'
    })