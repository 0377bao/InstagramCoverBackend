const AccountModel = require('../models/AccountModels');
const CommentModel = require('../models/CommentModel');
const PostModel = require('../models/PostModel');
const dotenv = require('dotenv');

dotenv.config();

class CommentService {
    createComment(newComment) {
        return new Promise(async (resolve, reject) => {
            const { account, content, postId } = newComment;
            try {
                const createComment = await CommentModel.create({ account, content, like: 0 });

                const commentAuthor = await AccountModel.findById(createComment.account).select('username avt').lean();
                if (createComment) {
                    const post = await PostModel.findById(postId);
                    post.comments.push(createComment._id);
                    await post.save();
                    resolve({
                        status: 'OK',
                        message: 'Create Account Success',
                        data: { ...createComment._doc, author: commentAuthor },
                    });
                }
            } catch (e) {
                reject(e);
            }
        });
    }
}

module.exports = new CommentService();
