const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express();

// 引入链接 并且数据库链接
const db = require('./config/key.js')
mongoose.connect(db.mongoURI).then(res => {
    console.log("数据库链接成功")
}).catch(() => {
    console.log('数据库连接失败')
})

// 引入body-paerser,post请求体设置
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


const port = process.env.port || 5000;

const user = require('./routes/api/users.js')

app.get('/', (req, res) => {
    res.end("hello world!")
})

app.use('/api/user', user)


app.listen(port, () => {
    console.log("服务启动5000");
})