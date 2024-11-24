const AccountService = require('../services/AccountService');
const dotenv = require('dotenv');

dotenv.config();

class AccountController {
    // [POST] api/news/create-news
    async createAccount(req, res) {
        try {
            const { avt, username, email, password } = req.body;
            if (!avt || !username || !email || !password) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The input is required',
                });
            }
            const responseService = await AccountService.createAccount(req.body);
            return res.status(200).json(responseService);
        } catch (e) {
            console.log(e);
            return res.status(404).json({
                error: e,
            });
        }
    }
    // [POST] api/news/create-news
    async findAccount(req, res) {
        try {
            const responseService = await AccountService.findAccount();
            return res.status(200).json(responseService);
        } catch (e) {
            console.log(e);
            return res.status(404).json({
                error: e,
            });
        }
    }
}
module.exports = new AccountController();
