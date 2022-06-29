const express = require('express');
const router = express.Router();
const { getPosts, getPostsByUser, setPost, updatePost, deletePost, filterMyPost, filterPosts, getAllPosts, filterAllPost } = require('../controllers/postController');

const { protect } = require('../middleware/authMiddleware')


router.route('/me/').get(protect, getPostsByUser).post(protect, setPost); //get my posts ... //POST
router.route('/me/:id').put(protect, updatePost).delete(protect, deletePost); //Update my post ... //Delete
router.route('/me/:find').get(protect, filterMyPost); //filter my posts
router.route('/allfilter/:find').get(filterAllPost); //filter all posts
router.route('/findall/').get(getAllPosts); //get all post
router.route('/all/').get(protect, getPosts); //get all post  but not mine
router.route('/:find').get(protect, filterPosts); //filter all posts but not mine

module.exports = router