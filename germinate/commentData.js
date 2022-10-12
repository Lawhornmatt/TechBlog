const { Comment } = require('../models');

const commentData = [
    { //1
        userid: 1,
        postid: 2,
        commentbody: "Good afternoon, sir/madam. What a marvelous post! Truly incredible, an exemplar of our wonderous internet community. Please continue to grace us with your wisdom on this internet forum. Comment 1"
    },
    { //2
        userid: 2,
        postid: 1,
        commentbody: "Good afternoon, sir/madam. What a marvelous post! Truly incredible, an exemplar of our wonderous internet community. Please continue to grace us with your wisdom on this internet forum. Comment 2"
    },
    { //3
        userid: 1,
        postid: 1,
        commentbody: "I am OP; I am commenting on my own post, hello"
    },
    { //4
        userid: 2,
        postid: 2,
        commentbody: "I am OP; I am commenting on my own post, hello"
    },
    { //5
        userid: 1,
        postid: 2,
        commentbody: "OP is a dum"
    },
    { //6
        userid: 2,
        postid: 1,
        commentbody: "No u"
    },
];

const seedComment = () => Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true
});

module.exports = seedComment;