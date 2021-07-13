var mysql = require("mysql")

/**连接 */
var connection = mysql.createConnection({
    host: "127.0.0.1",//数据库地址
    port: "3306", //端口号
    user: "root",//用户名
    password: "123456",//密码
    database: "plugback",//数据库名
})


//建立连接
connection.connect()

module.exports = connection