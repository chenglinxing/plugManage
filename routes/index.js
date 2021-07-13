var express = require('express');
var router = express.Router();

//数据库连接
let connection = require("../connectDataBase.js")
//Node.js邮件发送组件
let nodemailer = require("nodemailer")

// let bodyParser = require('body-parser')

const app = express()
// app.use(bodyParser.urlencoded({
//     extended: false
// }))


let transporter = nodemailer.createTransport({
    // host: 'smtp.163.com',
    service: "qq", //邮箱类型 例如service:'163'
    secure: true, //是否使用安全连接，对https协议的
    // port: 465, //qq邮件服务所占用的端口
    auth: {
        user: "1428054498@qq.com", //开启SMTP的邮箱，发件人
        pass: "yjbdbedscrvkgjfa" // qq授权码
        // pass: "AOFLHSYIPPVTBZQI" //163授权码
    }
})

router.get('/sendEmail', (req, res, next) => {
    let options = {
        from: '1428054498@qq.com', //发送方
        // to: '17521724386@163.com',
        to: "1428054498@qq.com",
        subject: '111111111111', //邮件主题
        text: "2222222222", //邮件正文
    }
    transporter.sendMail(options, (err, info) => {
        console.log(err, info)
        if (err) {
            res.send(err)
        } else {
            res.send(info)
        }
    })

})

router.get('/hello', (req, res, next) => {
    res.json({
        code: 200,
        data: [],
        msg: '获取成功'
    })
})

module.exports = router;