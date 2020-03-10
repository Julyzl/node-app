const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, // 根据对象里的user id 获取id
        ref: "users" // 关联表
    },
    handle: {
        type: String,
        required: true,
        max: 40,
    },
    company: {
        type: String,
    },
    website: {
        type: String,
    },
    location: {
        type: String,
    },
    status: { // 职业
        type: String,
        required: true
    },
    skills: { // 技能
        type: [String], // 数组类型，字符串
        required: true
    },
    bio: { // 职业介绍
        type: String,
    },
    githubusername: {
        type: String
    },
    experience: [ // 职业经历
        {
            current: { // 是否有，默认无
                type: Boolean,
                default: true
            },
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String,
            },
            from: {
                type: String,
                required: true
            },
            to: {
                type: String,
            },
            description: {
                type: String,
            },
        }
    ],
    education: [ // 教育
        {
            current: { // 是否有，默认无
                type: Boolean,
                default: false
            },
            school: {
                type: String,
                required: true
            },
            degree: { // 学历
                type: String,
                required: true
            },
            fieldofstudy: { // 专业
                type: String,
            },
            from: {
                type: String,
                required: true
            },
            to: {
                type: String,
            },
            description: {
                type: String,
            },
        }
    ],
    social: { // 社会联系
        wechat: {
            type: String
        },
        QQ: {
            type: String
        },
        tengxunkt: {
            type: String
        },
        wangyikt: {
            type: String
        }
    },
    date: { // 创建日期
        type: Date,
        default: Date.now
    },
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)