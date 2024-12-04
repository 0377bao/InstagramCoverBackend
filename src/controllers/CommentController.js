const CommentService = require('../services/CommentService');
const dotenv = require('dotenv');

dotenv.config();

class CommentController {
    async createComment(req, res) {
        try {
            const { account, content, postId } = req.body;
            console.log(req.body);

            if (!account || !content || !postId) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The input is required',
                });
            }
            const responseService = await CommentService.createComment(req.body);
            return res.status(200).json(responseService);
        } catch (e) {
            console.log(e);
            return res.status(404).json({
                error: e,
            });
        }
    }
}
module.exports = new CommentController();
