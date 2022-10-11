const User = require('./User');
const Post = require('./Post');

Post.belongsTo(User, { foreignKey: 'userid' });

module.exports = {
    User,
    Post
};