const AccountRouter = require('./AccountRouter');
const PostRouter = require('./PostRouter');
const Comment = require('./CommentRouter');

const routes = (app) => {
    app.use('/api/account', AccountRouter);
    app.use('/api/post', PostRouter);
    app.use('/api/comment', Comment);
};

module.exports = routes;
