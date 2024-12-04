const express = require('express');
const CommentController = require('../controllers/CommentController');

const router = express.Router();

router.post('/create-comment', CommentController.createComment);

module.exports = router;
