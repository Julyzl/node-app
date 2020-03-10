const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Post = require("../../models/post");
const Profile = require("../../models/profiles");


const validatePostInput = require("../../validation/post");


router.get('/text', (req, res) => {
    console.log(111);
    res.send('sss')
})

// 发表评论
router.post('/', (req, res) => {
    const { errors, isError } = validatePostInput(req.body);
    // 判断isError是否通过
    if (!isError) {
        return res.status(400).json(errors);
    }
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.body.id
    })
    newPost.save().then(post => res.json(post));
})

// 获取评论
router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(data => {
            res.json(data)
        })
        .catch(err => { res.json(err) })
})

// $route  GET api/posts/:id
// @desc   获取单个评论信息
// @access public
router.get("/:id", (req, res) => {

    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ msg: "找不到该评论信息" }))
})

// 删除单个信息 删除的信息id 
router.delete("/:id", (req, res) => {
    console.log(req.body);
    let user_id = req.body.id
    Post.find({ _id: req.params.id }).then(data => {
        if (data.user.toString() !== user_id) {
            return res.status(401).json({ msg: "用户非法操作!" })
        }
        data.remove().then(() => res.json({ success: true }))
    }).catch(err => {
        return res.status(404).json({ postnotfound: "没有该评论信息" })
    })


})

// 点赞
router.post("/like/:id", (req, res) => {
    let user_id = req.body.id
    Profile.findOne({ user: user_id }).then(profile => {
        Post.findById(req.params.id)
            .then(post => {
                if (post.likes.filter(like => like.user.toString() === user_id).length > 0) {
                    return res.status(400).json({ alreadyliked: "该用户已赞过" })
                }

                post.likes.unshift({ user: user_id })

                post.save().then(post => res.json(post))
            })
            .catch(err => res.status(404).json({ likederror: "点赞错误" }))
    })
})


//    取消点赞接口
router.post("/unlike/:id", (req, res) => {
    let user_id = req.body.id
    Profile.findOne({ user: user_id }).then(profile => {
        Post.findById(req.params.id)
            .then(post => {
                if (post.likes.filter(like => like.user.toString() === user_id).length === 0) {
                    return res.status(400).json({ notliked: "该用户没有点过赞" })
                }

                // 获取要删掉的user id
                const removeIndex = post.likes.map(item => item.user.toString()).indexOf(user_id);

                post.likes.splice(removeIndex, 1);

                post.save().then(post => res.json(post))
            })
            .catch(err => res.status(404).json({ likederror: "取消点赞错误" }))
    })
})

// $route  POST api/posts/comment/:id
// @desc   添加评论接口
// @access Private
router.post("/comment/:id", (req, res) => {
    const { errors, isError } = validatePostInput(req.body);

    // 判断isError是否通过
    if (!isError) {
        return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.body.id
            }

            post.comments.unshift(newComment);

            // save
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "添加评论错误" }))
})


// $route  DELETE api/posts/comment/:id
// @desc   删除评论接口
// @access Private
router.delete("/comment/:id/:comment_id", (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                return res.status(404).json({ commentnotexists: "该评论不存在" })
            }
            // 找到该评论的index
            const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);
            post.comments.splice(removeIndex, 1);
            // save
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "删除评论错误" }))
})
module.exports = router;