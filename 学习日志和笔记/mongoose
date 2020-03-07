设置具体的数据库

安装 

npm i mongoose --save

入口文件引入

```java
const mongoose = require('mongoose')
    mongoose.connect(db.mongoURI).then(res => {
    console.log("数据库链接成功")
}).catch(() => {
    console.log('数据库连接失败')
})
```

配置并且导出

```javascript
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    },
})

module.exports = User = mongoose.model('users', UserSchema)
```

使用

```java
const User = require('../../models/user.js')
        // 查询数据库中是否存在邮箱
    console.log(req.body);
    User.findOne({ email: req.body.email }).then((data) => {
       if(data){
        return res.status(400).json({ email: "邮箱已经被注册" })
       }else{
         const newUser=new User({
             name:req.body.name,
             email:req.body.email,
             avatar,
             password:req.body.email
         })
       }
    })
```

