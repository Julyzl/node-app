const token = require('./routes/service/token');
const user = require('./routes/api/users.js')
const profile = require('./routes/api/profiles.js');
const posts = require('./routes/api/post.js');
module.exports = (app) => {
    app.use('/api/user', user)
        // app.use('/api/profile', profile)
    app.use('/api/profile', token.verifyToken, profile)
    app.use('/api/posts', posts);
}