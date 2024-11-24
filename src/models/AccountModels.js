const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema(
    {
        avt: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        friends: [{ type: Schema.Types.ObjectId, ref: 'Account' }], // Tham chiếu đến các tài khoản bạn bè
        posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }], // Tham chiếu đến các bài viết của tài khoản này
    },
    { timestamps: true },
);

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;
