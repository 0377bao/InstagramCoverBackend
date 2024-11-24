const dotenv = require('dotenv');
const PostService = require('../services/PostService');

dotenv.config();

class PostController {
    // [POST] api/news/create-news
    async createPost(req, res) {
        try {
            const { content, authorId } = req.body;
            if (!content || !authorId) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The input is required',
                });
            }
            const response = {
                ...req.body,
            };
            const images = req.files;
            const urlImages = [];
            if (images) {
                await Promise.all(
                    images.map(async (imageItem) => {
                        urlImages.push(imageItem.path);
                    }),
                );
                response.image = urlImages;
            }
            const responseService = await PostService.createPost(response);
            return res.status(200).json(responseService);
        } catch (e) {
            console.log(e);
            return res.status(404).json({
                error: e,
            });
        }
    }
}
module.exports = new PostController();
