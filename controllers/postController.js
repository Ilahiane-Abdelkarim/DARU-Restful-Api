const asyncHandler = require('express-async-handler');

const Post = require('../models/postModel');
const User = require('../models/userModel');

// @desc    Get Posts 
// @route    GET api/posts
// @access Private
const getPostsByUser = asyncHandler(async (req, res) => {
    const posts = await Post.find({ user: req.user.id })
    res.status(200).json(posts)
})

// @desc    Get Posts 
// @route    GET api/posts/all/
// @access Private
const getPosts = asyncHandler(async (req, res) => {
    console.log(req.user._id)
    const posts = await Post.find({ user: { $ne: req.user.id } })
    res.status(200).json(posts)
})

// @desc    Set Post
// @route    POST api/posts
// @access Private
const setPost = asyncHandler(async (req, res) => {
    if (!req.body.title || !req.body.sub_title || !req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const post = await Post.create({
        title: req.body.title,
        sub_title: req.body.sub_title,
        text: req.body.text,
        user: req.user.id,
        tags: req.body.tags,
    })
    res.status(200).json(post)
})

// @desc    Update Post
// @route    PUT api/posts/:id
// @access Private
const updatePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        res.status(400)
        throw new Error('Post Not Found')
    }
    // const user = await User.findById(req.user.id)

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User Not Found')
    }

    // Make sur the login user match posts user
    if (post.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User Not connected')
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, })
    res.status(200).json(updatedPost)
})

// @desc    Delete Post
// @route    DELETE api/posts/:id
// @access Private
const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        res.status(400)
        throw new Error('Post Not Found')
    }


    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User Not Found')
    }

    // Make sur the login user match posts user
    if (post.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User Not connected')
    }

    await post.remove()
    res.status(200).json({ id: req.params.id })
})

// @desc    Get Post
// @route    GET api/posts/:par
// @access Private
const filterPosts = asyncHandler(async (req, res) => {

    const posts = await Post.find({
        $and: [
            {
                $or: [
                    { title: { $regex: req.params.find } },
                    { sub_title: { $regex: req.params.find } },
                    { text: { $regex: req.params.find } },
                    { tags: { $regex: req.params.find } }
                ]
            },
            { user: { $ne: req.user.id } }
        ]

    })
    if (posts) {
        res.status(200).json(posts)
    } else {
        res.status(400)
        throw new Error('Not found')
    }
})
const filterMyPost = asyncHandler(async (req, res) => {

    const posts = await Post.find({
        $and: [
            {
                $or: [
                    { title: { $regex: req.params.find } },
                    { sub_title: { $regex: req.params.find } },
                    { text: { $regex: req.params.find } },
                    { tags: { $regex: req.params.find } }
                ]
            },
            { user: { $in: req.user.id } }
        ]
    })
    if (posts) {
        res.status(200).json(posts)
    } else {
        res.status(400)
        throw new Error('Not found')
    }
})

// @desc    Get Posts 
// @route    GET api/posts/findall/
// @access Public
const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find()
    res.status(200).json(posts)
})

// @desc    Get Posts 
// @route    GET api/posts/all/:find
// @access Public
const filterAllPost = asyncHandler(async (req, res) => {

    const posts = await Post.find({
        $or: [
            { title: { $regex: req.params.find } },
            { sub_title: { $regex: req.params.find } },
            { text: { $regex: req.params.find } },
            { tags: { $regex: req.params.find } }
        ]
    })
    if (posts) {
        res.status(200).json(posts)
    } else {
        res.status(400)
        throw new Error('Not found')
    }
})



module.exports = {
    getPostsByUser,
    getPosts,
    setPost,
    updatePost,
    deletePost,
    filterMyPost,
    filterPosts,
    getAllPosts,
    filterAllPost
}