const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User, { 
    foreignKey: 'userid' 
});

Comment.belongsTo(User, {
    foreignKey: 'userid'
});

Post.hasMany(Comment, {
    foreignKey: 'postid'
});


module.exports = {
    User,
    Post,
    Comment
};