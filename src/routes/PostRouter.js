const express = require('express');
const PostController = require('../controllers/PostController');
const upload = require('../config/cloudinary.config');

const router = express.Router();

router.post('/create-post', upload.array('image'), PostController.createPost);
router.post('/like-post', PostController.likePost);
router.get('/find-post', PostController.findPost);

module.exports = router;
