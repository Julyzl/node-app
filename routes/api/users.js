const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const User = require('../../models/user.js')
router.get('/text', (req, res) => {
    res.json({ msg: "sjhsfj" })
})

// 注册模块
router.post('/register', (req, res) => {
    // 查询数据库中是否存在邮箱
    console.log(req.body);
    User.findOne({ email: req.body.email }).then((data) => {
        if (data) {
            return res.status(400).json({ email: "邮箱已经被注册" })
        } else {
            // 默认头像 根据邮箱生成头像
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.email
            })

            // 密码加密
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                })
            })
        }
    })
})

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password
        // 查询数据库是非存在邮箱
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ msg: '邮箱不存在' })
            }
            // 密码匹配
            console.log(password);
            console.log(user.password)
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    res.json({ msg: "success" });
                } else {
                    return res.status(400).json({ password: '密码错误!' });
                }
            });
        })
})
module.exports = router