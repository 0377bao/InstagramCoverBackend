const PostModel = require('../models/PostModel');
const AccountModel = require('../models/AccountModels');
const dotenv = require('dotenv');

dotenv.config();

class PostService {
    // [POST] /api/product/create-product
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
                    console.log(createPost);

                    resolve({
                        status: 'OK',
                        message: 'Create Post Success',
                        // data: createPost,
                    });
                }
            } catch (e) {
                reject(e);
            }
        });
    }
}

module.exports = new PostService();
