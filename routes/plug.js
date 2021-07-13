var express = require("express")
var router = express.Router()

let dateFormat = require("../utils/dateFormat")
    /**引入sql连接 */
let connection = require("../connectDataBase.js")



/**新增插件 */
router.post("/insertPlug", (req, res, next) => {
    let body = req.body
    let currentDate = dateFormat(new Date(), "YYYY-mm-dd HH:MM:SS")
    let insertPlug = "insert into pluginfo(plugName,plugLink,plugDes,insertPlugDate,lastUpdatePlugDate,userId,plugTypeId) values(?,?,?,?,?,?,?)"
    let insertParams = [body.plugName, body.plugLink, body.plugDes, currentDate, currentDate, body.userId, body.plugTypeId]
    connection.query(insertPlug, insertParams, (err, doc) => {
        if (err) res.json({ code: 500, data: null, msg: err })
        res.json({
            code: 200,
            data: doc,
            msg: "插件添加成功！"
        })
    })
})

/**查询所有插件 包括模糊查询 */
router.get("/selectPlug", (req, res, next) => {
    let query = req.query
    let left = (query.pageNo - 1) * query.pageSize
    let right = query.pageSize
    let selectPlugSql = `select  plugId,plugName,plugLink,plugDes,insertPlugDate,lastUpdatePlugDate,userName,plugTypeName from pluginfo p 
    left join userinfo u on p.userId = u.userId
    left join plugtypeinfo pt on pt.plugTypeId = p.plugTypeId  
    where plugName like '%${query.plugName}%' and plugLink like '%${query.plugLink}%'  and insertPlugDate like '%${query.insertPlugDate}%'
    and p.isDel is null or p.isDel =2
    order by insertPlugDate desc limit ${left},${right}`;
    // console.log(selectPlugSql)
    //查询所有的插件
    let selectAllSql = `select count(*) as count from pluginfo p 
    left join userinfo u on p.userId = u.userId
    left join plugtypeinfo pt on pt.plugTypeId = p.plugTypeId  
    where plugName like '%${query.plugName}%' and plugLink like '%${query.plugLink}%'  and insertPlugDate like '%${query.insertPlugDate}%'
    and p.isDel is null or p.isDel =2`
    let countPlug = 0;
    connection.query(selectAllSql, (err, doc) => {
        countPlug = doc[0].count
    })
    connection.query(selectPlugSql, (err, doc) => {
        if (err) res.json({ code: 500, data: null, msg: err })
        res.json({
            code: 200,
            data: { data: doc, count: countPlug },
            msg: "查询成功！"
        })
    })
})

/**获取单个插件 根据插件id查询详情*/
router.get("/getOnePlug", (req, res, next) => {
    let query = req.query;
    let selectOne = "select * from pluginfo where plugId ='" + query.plugId + "'"
    connection.query(selectOne, (err, doc) => {
        if (err) res.json({ code: 500, data: null, msg: err })
        res.json({
            code: 200,
            data: doc,
            msg: "查询成功"
        })
    })
})

/**修改插件内容 */
router.post('/updatePlugById', (req, res, next) => {
    let body = req.body
    let updateSql = `update pluginfo p,plugtypeinfo pt 
    set plugName='${body.plugName}',plugLink='${body.plugLink}',plugDes='${body.plugDes}',p.plugTypeId=${body.plugTypeId},lastUpdatePlugDate='${dateFormat(new Date(), 'YYYY-mm-dd HH:MM:SS')}' 
    where p.plugTypeId=pt.plugTypeId and plugId='${body.plugId}'`
    connection.query(updateSql, (err, doc) => {
        if (err) res.json({ code: 500, data: null, msg: err })
        res.json({
            code: 200,
            // data: doc,
            msg: "修改成功"
        })
    })
})

/**删除插件 根据plugInfo的isDel属性判断 */
router.get('/deletePlugById', (req, res, next) => {
    let query = req.query
    let deletePlugSql = `update pluginfo set isDel=1 where plugId = ${query.plugId}`
    connection.query(deletePlugSql, (err, doc) => {
        if (err) res.json({ code: 500, data: null, msg: err })
        res.json({
            code: 200,
            // data: doc,
            msg: "删除成功"
        })
    })
})

/**获取所有的插件类型 */
router.get("/getAllPlugType", (req, res, next) => {
    // let body = req.body
    let getAll = "select * from plugtypeinfo";
    connection.query(getAll, (err, doc) => {
        if (err) res.json({ code: 500, data: null, msg: err })
        res.json({
            code: 200,
            data: doc,
            msg: "插件类型获取成功！"
        })
    })
})


/**获取所有的插件类型 带分页 */
router.get('/getAllPlugTypePag', (req, res, next) => {
    let query = req.query
        // console.log(query)
    let left = (query.pageNo - 1) * query.pageSize
    let right = query.pageSize
    let countPlugTypeInfo = 0

    let sql = `select * from plugtypeinfo 
               where plugTypeId like '%${query.plugTypeId}%' and plugTypeName like '%${query.plugTypeName}%' and addTypeTime like '%${query.addTypeTime}%'
               and isDel is null or isDel =2
               order by addTypeTime desc limit ${left},${right}`
        // console.log(sql)
    let countSql = `select count(1) as count from plugtypeinfo 
               where plugTypeId like '%${query.plugTypeId}%' and plugTypeName like '%${query.plugTypeName}%' and addTypeTime like '%${query.addTypeTime}%'
               and isDel is null or isDel =2`

    connection.query(countSql, (err, doc) => {
        countPlugTypeInfo = doc[0].count
    })
    connection.query(sql, (err, doc) => {
        if (err) res.json({ code: 500, data: null, msg: err })
        res.json({
            code: 200,
            data: { data: doc, count: countPlugTypeInfo },
            msg: "查询成功！"
        })
    })

})

/**添加插件类型 */
router.post('/insertPlugType', (req, res, next) => {
    let body = req.body
    let currentTime = dateFormat(new Date(), "YYYY-mm-dd HH:MM:SS")
    let insertSql = `insert into plugtypeinfo(plugTypeName,plugTypeDes,addTypeTime,lastUpdateTypeTime,userId) values(?,?,?,?,?)`
    let insertParams = [body.plugTypeName, body.plugTypeDes, currentTime, currentTime, body.userId]
    connection.query(insertSql, insertParams, (err, doc) => {
        if (err) res.json({ code: 500, data: null, msg: err })
        res.json({
            code: 200,
            data: doc,
            msg: "新增插件类型成功！"
        })
    })
})

/**根据插件类型id 查询详情信息 */
router.get('/getPlugTypeInfoById', (req, res, next) => {
    let query = req.query
    let selectSql = `select * from plugtypeinfo where plugTypeId=${query.plugTypeId}`
    connection.query(selectSql, (err, doc) => {
        if (err) res.json({ code: 500, data: null, msg: err })
        res.json({
            code: 200,
            data: doc,
            msg: "查询插件类型详情成功！"
        })
    })
})

/**修改插件类型 根据插件类型id*/
router.post('/updatePlugInfoById', (req, res, next) => {
    let body = req.body
    let updateSql = `update plugtypeinfo set plugTypeName='${body.plugTypeName}',plugTypeDes='${body.plugTypeDes}'
        where plugTypeId=${body.plugTypeId}`
    connection.query(updateSql, (err, doc) => {
        if (err) res.json({ code: 500, data: null, msg: err })
        res.json({
            code: 200,
            msg: "修改成功！"
        })
    })
})

/**删除插件类型 根据插件类型id 只改变isDel*/
router.get('/deletePlugInfoById', (req, res, next) => {
    let query = req.query
    let deleteSqlById = `update plugtypeinfo set isDel=1 where plugTypeId=${query.plugTypeId}`
    console.log(deleteSqlById)
    connection.query(deleteSqlById, (err, doc) => {
        if (err) res.json({ code: 500, data: null, msg: err })
        res.json({
            code: 200,
            msg: "删除成功！"
        })
    })
})

module.exports = router