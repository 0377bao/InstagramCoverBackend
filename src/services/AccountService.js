const AccountModel = require('../models/AccountModels');
const dotenv = require('dotenv');

dotenv.config();

class AccountService {
    createAccount(newAccount) {
        return new Promise(async (resolve, reject) => {
            const { avt, username, email, password } = newAccount;
            try {
                const checkUserName = await AccountModel.findOne({ username });
                if (checkUserName) {
                    resolve({
                        status: 'ERR',
                        message: 'Username already in use',
                    });
                }
                const createAccount = await AccountModel.create({
                    avt,
                    username,
                    email,
                    password,
                    friends: [],
                    posts: [],
                });

                if (createAccount) {
                    resolve({
                        status: 'OK',
                        message: 'Create Account Success',
                        data: createAccount,
                    });
                }
            } catch (e) {
                reject(e);
            }
        });
    }
    findAccount() {
        return new Promise(async (resolve, reject) => {
            const accounts = await AccountModel.find({});

            try {
                resolve({
                    status: 'OK',
                    message: 'Find Account Success',
                    data: accounts,
                });
            } catch (e) {
                reject(e);
            }
        });
    }
}

module.exports = new AccountService();
