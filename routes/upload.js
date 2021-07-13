var express = require('express');
var router = express.Router();
let fs = require('fs') //文件处理
let multer = require('multer') //

let connection = require("../connectDataBase.js")

let upload = multer({ dest: './public/uploadFile/' })
let dateFormat = require("../utils/dateFormat")



/**文件上传*/
router.post('/uploadFile', upload.any(), (req, res, next) => {
    let file = req.files[0]
    console.log(file)
        //文件重新命名
    let fileNameArr = file.originalname.split('.');
    let suffix = fileNameArr[fileNameArr.length - 1];
    let currentDate = dateFormat(new Date(), 'YYYYmmddHHMMSS')
    let fileNewName = `${currentDate}_${fileNameArr[0]}.${suffix}`
    fs.renameSync('./public/uploadFile/' + file.filename, `./public/uploadFile/${fileNewName}`)
        //   fs.rename('./public/uploadFile/' + file.filename, `./public/uploadFile/${fileNameArr[0]}.${suffix}`, (res) => {
        //   })
        //   // res.send(file.filename)
        //   // res.send(`${fileNameArr[0]}.${suffix}`)
        //   res.send(file)
        // })

    // let des_file = "./public/uploadFile/" + file.originalname;
    // fs.writeFileSync(des_file, fs.readFileSync(file.path))

    /**如果存在相同的文件  则不添加  根据图片名称、二进制名称、文件类型及大小判断 */
    //上传成功后在fileInfo表中插入文件数据
    let select = `select * from fileinfo where  fileName='${file.originalname}' and fileType='${suffix}' and fileSize='${file.size}'`
    console.log(select)
    connection.query(select, (selectErr, selectData) => {
        //当文件相同时
        if (selectData.length > 0) {
            let response = {
                    filename: selectData[0].fileId,
                    path: selectData[0].filePath,
                    fileNameCN: selectData[0].fileNewName,
                }
                // console.log(response, '111111111')
            res.send(response)
        } else {
            let sql = "insert into fileinfo(fileId,fileName,fileNewName,fileType,filePath,fileSize) values(?,?,?,?,?,?)"
            let sqlParams = [file.filename, file.originalname, fileNewName, suffix, file.path, file.size]
            connection.query(sql, sqlParams, (err, doc) => {
                if (err) res.json({ code: 500, data: null, msg: err })
                let response = {
                        filename: req.files[0].filename,
                        path: req.files[0].path,
                        fileNameCN: fileNewName,
                    }
                    // console.log(response, '2222222222222')
                res.send(response)
            })
        }
    })


})

/**文件预览 */
router.get('/previewFile', (req, res, next) => {
    let fileId = req.query.fileId
    let selectFile = `select * from fileinfo where fileId='${fileId}'`
    connection.query(selectFile, (err, doc) => {
        if (err) res.json({ code: 500, data: null, msg: err })
        res.json({
            code: 200,
            data: doc[0],
        })
    })
})


/**用户上传头像 */
router.post('/uploadAvatar', (req, res, next) => {
    let body = req.body
    let updateSql = `update userinfo set fileId='${body.fileId}' where userId=${body.userId}`
    connection.query(updateSql, (err, doc) => {
        if (err) res.json({ code: 500, msg: err })
        res.json({
            code: 200,
            msg: '上传成功'
        })
    })
})


/**用户头像下载 */
router.get('/downloadAvatar', (req, res, next) => {
    let fileId = req.query.fileId
        //根据fileId查找对应的文件名
    let sql = `select fileNewName from fileinfo where fileId='${fileId}'`
    connection.query(sql, (err, doc) => {
        res.download(`./public/uploadFile/${doc[0].fileNewName}`)
    })

})

module.exports = router;