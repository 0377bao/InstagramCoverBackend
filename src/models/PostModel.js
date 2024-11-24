const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');

const postSchema = new Schema({
    content: { type: String, required: true },
    image: { type: [String], required: true },
    author: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'Account' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
