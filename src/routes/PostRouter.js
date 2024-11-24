const express = require('express');
const PostController = require('../controllers/PostController');
const upload = require('../config/cloudinary.config');

const router = express.Router();

router.post('/create-post', upload.array('image'), PostController.createPost);

module.exports = router;
