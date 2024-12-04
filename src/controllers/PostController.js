const dotenv = require('dotenv');
const PostService = require('../services/PostService');

dotenv.config();

class PostController {
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
    async findPost(req, res) {
        try {
            const { page, authorId } = req.query;
            if (!page || !authorId) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The input is required',
                });
            }
            const responseService = await PostService.findPost(req.query);
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
