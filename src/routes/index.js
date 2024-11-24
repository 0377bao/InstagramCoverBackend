const AccountRouter = require('./AccountRouter');
const PostRouter = require('./PostRouter');

const routes = (app) => {
    app.use('/api/account', AccountRouter);
    app.use('/api/post', PostRouter);
};

module.exports = routes;
