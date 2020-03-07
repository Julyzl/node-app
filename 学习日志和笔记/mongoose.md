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

```shell
// 引入mongoose
const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost/test');

// 设计表的结构
let Schema = mongoose.Schema

let students = new Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        required: true
    },
    bob: {
        type: String,
        required: true
    }
})

// 将文档结构发布为模型  mongoose.model('大写名词来表示数据库名称'，'架构')
let User = mongoose.model("User", students)
module.exports=User;
```

