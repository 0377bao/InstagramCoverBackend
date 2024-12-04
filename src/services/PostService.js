const PostModel = require('../models/PostModel');
const AccountModel = require('../models/AccountModels');
const CommentModel = require('../models/CommentModel');
const dotenv = require('dotenv');
const Post = require('../models/PostModel');

dotenv.config();

class PostService {
    createPost(newPost) {
        return new Promise(async (resolve, reject) => {
            const { authorId, content, image } = newPost;

            try {
                const createPost = await PostModel.create({
                    content,
                    image,
                    author: authorId,
                    likes: [],
                    comments: [],
                });
                if (createPost) {
                    const author = await AccountModel.findById(authorId);
                    author.posts.push(createPost._id);
                    await author.save();

                    resolve({
                        status: 'OK',
                        message: 'Create Post Success',
                    });
                }
            } catch (e) {
                reject(e);
            }
        });
    }
    findPost(findPost) {
        return new Promise(async (resolve, reject) => {
            const { authorId, page, limit } = findPost;
            const limitCurrent = limit || 5;
            try {
                const author = await AccountModel.findById(authorId).select('friends');
                if (!author) {
                    resolve({
                        status: 'ERR',
                        message: 'Author not found',
                    });
                }
                const friendsIds = author.friends;
                const filterFriends = [...friendsIds, authorId];
                const posts = await Post.find({ author: { $in: filterFriends } })
                    .sort({ createdAt: -1 })
                    .limit(limitCurrent)
                    .skip((page - 1) * limitCurrent);
                const postsData = await Promise.all(
                    posts.map(async (post) => {
                        // Lấy thông tin tác giả của bài viết
                        const authorTemp = await AccountModel.findById(post.author).select('username avt');
                        post.author = authorTemp;

                        // Lấy thông tin chi tiết của các comment
                        const postComments = await CommentModel.find({
                            _id: { $in: post.comments }, // Lấy tất cả comments theo danh sách ID
                        }).lean();

                        // Thêm thông tin tài khoản (author) vào từng comment
                        const enrichedComments = await Promise.all(
                            postComments.map(async (comment) => {
                                const commentAuthor = await AccountModel.findById(comment.account)
                                    .select('username avt')
                                    .lean();

                                return {
                                    ...comment, // Thông tin comment
                                    author: commentAuthor, // Thông tin người viết comment
                                };
                            }),
                        );
                        const likesIndex = post.likes.findIndex((id) => id.toString() === authorId);
                        const isLike = likesIndex !== -1;

                        return {
                            ...post._doc,
                            isLike,
                            comments: enrichedComments,
                        };
                    }),
                );

                resolve({
                    status: 'OK',
                    message: 'Find Post Success',
                    data: postsData,
                });
            } catch (e) {
                reject(e);
            }
        });
    }
    likePost(data) {
        return new Promise(async (resolve, reject) => {
            const { authorId, postId } = data;
            try {
                const post = await PostModel.findById(postId);
                if (!post) {
                    resolve({
                        status: 'ERR',
                        message: 'Post not found',
                    });
                } else {
                    const likesIndex = post.likes.findIndex((id) => id.toString() === authorId);

                    if (likesIndex !== -1) {
                        post.likes.splice(likesIndex, 1);
                    } else {
                        post.likes.push(authorId);
                    }

                    await post.save();
                    resolve({
                        status: 'OK',
                        message: likesIndex !== -1 ? 'Unlike successful' : 'Like successful',
                        data: post,
                    });
                }
            } catch (e) {
                reject(e);
            }
        });
    }
}

module.exports = new PostService();
