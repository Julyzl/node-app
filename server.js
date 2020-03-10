const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session');

const router = require('./router.js');
const app = express();

// 引入链接 并且数据库链接
const db = require('./config/key.js')
mongoose.connect(db.mongoURI).then(res => {
    console.log("数据库链接成功")
}).catch(() => {
    console.log('数据库连接失败')
})

// 引入body-paerser,post请求体设置
// 使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//express不支持Cookie和Session
//用express-session插件来解决
app.use(session({
    //配置加密字符串
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

const port = process.env.port || 5000;



app.get('/', (req, res) => {
    res.end("hello world!")
})
const token = require('./routes/service/token')
router(app)


app.listen(port, () => {
    console.log("服务启动5000");
})