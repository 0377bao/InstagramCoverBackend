const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    account: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    like: { type: Number, required: true },
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
