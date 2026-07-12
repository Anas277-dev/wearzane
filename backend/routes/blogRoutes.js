const express = require('express');
const router = express.Router();
const { getBlogs, addBlog, deleteBlog } = require('../controllers/blogController');

router.get('/', getBlogs);
router.post('/add', addBlog);
router.delete('/:id', deleteBlog);

module.exports = router;