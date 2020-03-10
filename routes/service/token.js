const jwt = require('jsonwebtoken');
const passport = require('passport');
// jwt.sign('规则','加密名字','过期时间对象','箭头函数')

let keys = 'july'
    // 创建token
const createToken = (user_id) => {
    const rule = { id: user_id }

    let exp = { expiresIn: 3600 }
    let token = jwt.sign(rule, keys, exp)
    return token;
}

const verifyToken = (req, res, next) => {
    let token = req.headers.authorization;
    jwt.verify(token, keys, function(err, decode) {
        if (err) {
            if (err.name == 'TokenExpiredError') {
                res.status(403).json({
                    code: 403,
                    msg: '身份令牌已经过期,请重新登录!'
                })
            } else {
                res.status(429).json({
                    code: 429,
                    msg: '该操作需要身份令牌,请重新登录!'
                })
            }
        } else {
            // res.status(200).json({
            //     code: 200,
            //     msg: '验证成功',
            //     userid: decode.userid
            // })
            next()
        }
    })
}
module.exports = { createToken, verifyToken }