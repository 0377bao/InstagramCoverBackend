const AccountModel = require('../models/AccountModels');
const PostModel = require('../models/PostModel');
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
    findDetailAccount(id) {
        return new Promise(async (resolve, reject) => {
            const account = await AccountModel.findById(id);
            const postDetail = await Promise.all(
                account.posts.map(async (post) => {
                    const postTemp = await PostModel.findById(post).select('content image');
                    return postTemp;
                }),
            );

            const rest = {
                _id: account._id,
                avt: account.avt,
                username: account.username,
                email: account.email,
                friends: account.friends,
                posts: account.posts,
            };

            try {
                resolve({
                    status: 'OK',
                    message: 'Find Account Success',
                    data: {
                        ...rest,
                        posts: postDetail,
                    },
                });
            } catch (e) {
                reject(e);
            }
        });
    }
    loginAccount(loginAccount) {
        return new Promise(async (resolve, reject) => {
            const { username, password } = loginAccount;
            try {
                const account = await AccountModel.findOne({ username });
                if (account) {
                    if (account.password === password) {
                        const postDetail = await Promise.all(
                            account.posts.map(async (post) => {
                                const postTemp = await PostModel.findById(post).select('content image');
                                return postTemp;
                            }),
                        );
                        const rest = {
                            _id: account._id,
                            avt: account.avt,
                            username: account.username,
                            email: account.email,
                            friends: account.friends,
                            posts: account.posts,
                        };
                        resolve({
                            status: 'OK',
                            message: 'Login Success',
                            data: {
                                ...rest,
                                posts: postDetail,
                            },
                        });
                    } else {
                        resolve({
                            status: 'ERR',
                            message: 'Password is incorrect',
                        });
                    }
                } else {
                    resolve({
                        status: 'ERR',
                        message: 'Account not found',
                    });
                }
            } catch (e) {
                reject(e);
            }
        });
    }
}

module.exports = new AccountService();
