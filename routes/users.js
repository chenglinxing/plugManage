var express = require("express")
var router = express.Router()

let dateFormat = require("../utils/dateFormat")
    /**引入sql连接 */
let connection = require("../connectDataBase.js")


/**新增（注册）用户 
 * 用户名跟密码一样则登录成功，否则用户名不能重复 */
router.post("/userRegister", (req, res, next) => {
    /**查询出用户名是否重复
     * 1.出现重复
     * 2.没出现重复
     */
    let body = req.body
    let sqlAllName = "select * from userinfo where userPassword='" + body.userPassword + "' and userName='" + body.userName + "'"
    console.log(sqlAllName)
        //注册
    connection.query(sqlAllName, (err, doc) => {
        //未出现重复
        if (doc.length == 0) {
            //添加
            let insertSql = "insert into userinfo(userName,userPassword,userEmail,userRights,lastLoginTime,registerTime) values(?,?,?,?,?,?)"
            let insertParams = [body.userName, body.userPassword, body.userEmail, body.userRights, body.lastLoginTime, dateFormat(new Date(), "YYYY-mm-dd HH:MM:SS")]

            connection.query(insertSql, insertParams, (errInsert, docInsert) => {
                if (errInsert) {
                    res.json({
                        code: 501,
                        msg: errInsert.sqlMessage
                    })

                } else {
                    res.json({
                        code: 200,
                        data: docInsert,
                        msg: "注册成功！"
                    })
                }

            })

        } else {
            let sqlAll = sqlAllName + "and userEmail='" + body.userEmail + "'"
            console.log(sqlAll)
            connection.query(sqlAll, (errAll, docAll) => {
                if (docAll.length == 1) {
                    res.json({
                        code: 201,
                        data: docAll,
                        msg: "用户名或邮箱已被注册！"
                    })
                } else {
                    res.json({
                        code: 500,
                        data: null,
                        msg: "用户名或邮箱错误！"
                    })
                }
            })
        }

    })

})

/**用户登录 */
router.post('/userLoginIn', (req, res, next) => {
    let body = req.body
    let sqlName = "select * from userinfo u left join userrightinfo ur on u.userRights=ur.userRightId left join fileinfo f on u.fileId=f.fileId "
    let sqlSelectAll = "where userPassword='" + body.userPassword + "' and userName='" + body.userName + "' or userEmail='" + body.userName + "'"
    let loginSql = sqlName + sqlSelectAll
    console.log(loginSql)
    connection.query(loginSql, (errAll, docAll) => {
        if (docAll.length == 1) {
            //当登录成功时，更新最后登录时间
            let updateLastLoginDate = "update userinfo set lastLoginTime='" + dateFormat(new Date(), "YYYY-mm-dd HH:MM:SS") + "'" + sqlSelectAll;
            connection.query(updateLastLoginDate, (errUpdate, docUpdate) => {
                if (errUpdate) {
                    res.json({
                        code: 500,
                        data: errUpdate,
                        msg: "最后登录时间更新失败！"
                    })
                    return
                }
            })
            connection.query(loginSql, (loginErr, logSuccess) => {
                //更新成功后再查一次
                res.json({
                    code: 200,
                    data: logSuccess,
                    msg: "登录成功！"
                })
            })

        } else {
            res.json({
                code: 501,
                data: docAll,
                msg: "用户名或密码错误！"
            })
        }
    })

})

/**用户登录后获取菜单用户权限  根据userId查询*/
router.get('/getUserRights', (req, res, next) => {

    let userId = req.query.userId
    let getRights = `select * from usermenuinfo where menuRights like concat('%',(select (
    select urt.userRightId as bid from userinfo u
    left join userrightinfo urt on u.userRights = urt.userRightId
    where userId =${userId})),'%')`
    connection.query(getRights, (err, doc) => {
        res.json({
            code: 200,
            data: {
                toTreeData: toTree(doc),
                data: doc
            },
            msg: "数据获取成功！"
        })
    })
})

/**根据userId获取用户的所有数据 */
router.get('/getUserInfoByUserId', (req, res, next) => {
    let userId = req.query.userId
    let sql = `select * from userinfo u left join fileinfo f on u.fileId=f.fileId where userId='${userId}'`
    connection.query(sql, (err, doc) => {
        res.json({
            code: 200,
            data: doc[0],
            msg: '获取用户信息成功！'
        })
    })
})

/**根据用户信息中的 fileId 查询对应的文件全名*/
router.get('/getUserAvatarByFileId', (req, res, next) => {
    let fileId = req.query.fileId
    let sql = `select * from `
})

/**获取当近三月活跃用户  => 通过用户最后登录时间判断*/
router.get("/getActiveUser", (req, res, next) => {
    // console.log(req.query)
    //获取所有的评论
    let sql = "select count(*) as 用户活跃数量,date_format(lastLoginTime,'%Y-%m') as month from userinfo group by date_format(lastLoginTime,'%Y%m')";
    connection.query(sql, (err, doc) => {
        res.json({
            code: 200,
            data: doc,
            msg: "数据获取成功！"
        })
    })
})

/**用户累计注册总数：用户当月注册总数 */
router.get("/getCountRegUser", (req, res, next) => {
    let sql = "select count(1) as currentMonth,(select count(1) from userinfo ) as countAll from userinfo where date_format(registerTime,'%y-%M') = date_format(now(),'%y-%M')"
    connection.query(sql, (err, doc) => {
        res.json({
            code: 200,
            data: doc,
            msg: "数据获取成功！"
        })
    })
})

/**获取所有用户*/
router.get('/getAllUser', (req, res, next) => {
    let query = req.query
    let left = (query.pageNo - 1) * query.pageSize
    let right = query.pageSize
    let selectAllUserSql = `select * from userinfo where userName like '%${query.userName}%' and userEmail like '%${query.userEmail}%'
    order by registerTime desc limit ${left},${right}`
    let countUserSql = `select count(*) as count from userinfo where userName like '%${query.userName}%' and userEmail like '%${query.userEmail}%'`
    let count = null
        //获取总数
    connection.query(countUserSql, (err, doc) => {
        count = doc[0].count
    })
    connection.query(selectAllUserSql, (err, doc) => {
        if (err) res.json({
            code: 500,
            data: null,
            msg: err
        })
        res.json({
            code: 200,
            data: {
                data: doc,
                count: count
            },
            msg: "获取所有用户成功！"
        })
    })
})

/**根据menuId获取菜单的详情 */
router.get('/getMenuDetail', (req, res, next) => {
    let menuId = req.query.menuId
    let sql = `select * from usermenuinfo where menuId=${menuId}`
    connection.query(sql, (err, doc) => {
        if (err) res.json({
            code: 500,
            data: null,
            msg: err
        })
        res.json({
            code: 200,
            data: doc,
            msg: "获取菜单信息成功"
        })
    })
})

/**根据menuId修改菜单详情 */
router.post('/updateMenuDetail', (req, res, next) => {
    let body = req.body
        // console.log(body)
    let sql = `update usermenuinfo 
             set menuName='${body.menuName}',menuIcon='${body.menuIcon}',menuRights='${body.menuRights}'
             where menuId='${body.menuId}'`
        // console.log(sql)
    connection.query(sql, (err, doc) => {
        if (err) res.json({
            code: 500,
            data: null,
            msg: err
        })
        res.json({
            code: 200,
            data: doc,
            msg: "修改菜单信息成功！"
        })
    })
})

function toTree(data) {
    // 删除 所有 children,以防止多次调用
    data.forEach(function(item) {
        delete item.children;
    });

    // 将数据存储为 以 id 为 KEY 的 map 索引数据列
    var map = {};
    data.forEach(function(item) {
        map[item.menuId] = item;
    });
    //        console.log(map);
    var val = [];
    data.forEach(function(item) {
        // 以当前遍历项，的pid,去map对象中找到索引的id
        var parent = map[item.parentMenuId];

        // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
            val.push(item);
        }
    });
    return val;
}


module.exports = router