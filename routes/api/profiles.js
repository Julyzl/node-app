const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const Profile = require('../../models/profiles.js');
const User = require('../../models/user.js');

const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

router.get('/text', (req, res) => {
    res.json({ msg: "ssss" })
})

// 获取个人信息接口
router.get("/", (req, res) => {
    console.log(1111)
    console.log(req.query.id)
    let errors = {}
    Profile.findOne({ user: req.query.id })
        .populate('user', ["name", "avatar", 'email']) //关联表
        .then((data) => {
            if (!data) {
                errors.msg = "该用户信息不存在"
                return res.status(404).json(errors)
            }
            res.json(data)
        }).catch((err) => {
            res.status(404).json(err)
        })
})

// 创建和编辑个人信息接口
router.post('/', (req, res) => {

    const { errors, isError } = validateProfileInput(req.body);

    // 判断isError是否通过
    if (!isError) {
        return res.status(400).json(errors);
    }
    const profileFields = {};
    profileFields.user = req.body.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;


    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    // skills - 数组转换
    if (typeof req.body.skills !== "undefined") {
        profileFields.skills = req.body.skills.split(","); // 数组分割
    }

    profileFields.social = {};

    if (req.body.wechat) profileFields.social.wechat = req.body.wechat;
    if (req.body.QQ) profileFields.social.QQ = req.body.QQ;
    if (req.body.tengxunkt) profileFields.social.tengxunkt = req.body.tengxunkt;
    if (req.body.wangyikt) profileFields.social.wangyikt = req.body.wangyikt;
    console.log(req.body.id);
    Profile.findOne({ user: req.body.id }).then(data => {
        if (data) {
            // 信息存在,就更新
            Profile.update({ user: req.body.id }, { $set: profileFields }, { new: true }).then(data => {
                res.json(data)
            })
        } else {
            // 信息不存在，就创建
            Profile.findOne({ handle: profileFields.handle }).then(profile => {

                if (profile) {
                    errors.handle = "该用户的handle个人信息已经存在,请勿重新创建!";
                    return res.status(400).json(errors);
                }
                // 
                new Profile(profileFields).save().then(profile => {
                        res.json(profile)
                    }

                );
            })
        }
    }).catch(err => {
        res.status(400).json({ msg: '错误' })
    })
})

// 通过handle获取个人信息
router.get("/handle/:handle", (req, res) => {
    const errors = {}
    console.log(req.params.handle);
    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'avatar'])
        .then(data => {
            if (data) {
                res.json(data)
            } else {
                errors.name = '未找到该用户信息'
                res.json(errors)
            }
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

// 通过id获取个人信息
router.get("/user/:user_id", (req, res) => {
    const errors = {}
    Profile.findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatar'])
        .then(data => {
            if (data) {
                res.json(data)
            } else {
                errors.name = '未找到该用户信息'
            }
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

// 获取所有人的信息
router.get("/all", (req, res) => {
    const errors = {}
    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(data => {
            if (data) {
                res.json(data)
            } else {
                errors.name = '未找到任何信息'
            }
        })
        .catch(err => {
            return res.status(400).json(err)
        })
})

// 添加个人经历
router.post("/experience", (req, res) => {
    const { errors, isError } = validateExperienceInput(req.body);

    // 判断isError是否通过
    if (!isError) {
        return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.body.id }).then(data => {
        const newExp = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description,
        }
        data.experience.unshift(newExp)
        data.save().then(resp => {
            res.status(200).json(resp)
        })
    })
})

// 添加教育经历
router.post("/education", (req, res) => {
    const { errors, isError } = validateEducationInput(req.body);
    // 判断isError是否通过
    if (!isError) {
        return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.body.id }).then(data => {
        console.log(data);
        const newEdu = {
            school: req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description,
        }
        data.education.unshift(newEdu)
        data.save().then(resp => {
            res.status(200).json(resp)
        })
    })
})

// 删除个人经历
router.post("/experience/del", (req, res) => {

    Profile.findOne({ user: req.body.id }).then(data => {
        console.log(data)
        const index = data.experience.findIndex(i => i.id = req.body.del_id)
        data.experience.splice(index, 1)
        data.save().then(resp => {
            res.status(200).json(resp)
        })
    })
})

// 删除教育经历
router.post("/education/del", (req, res) => {

    Profile.findOne({ user: req.body.id }).then(data => {
        const index = data.education.findIndex(i => i.id = req.body.del_id)
        data.education.splice(index, 1)
        data.save().then(resp => {
            res.status(200).json(resp)
        })
    })
})

// 删除整个用户
router.post("/del", (req, res) => {
    Profile.findOneAndRemove({ user: req.body.id })
        .then(() => {
            User.findOneAndRemove({ _id: req.body.id })
                .then(() => {
                    res.json({ success: true })
                })
        })
})
module.exports = router