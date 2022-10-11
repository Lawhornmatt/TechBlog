const { Post } = require('../models');

const postData = [
    { //1
        userid: 1,
        postbody: "Writing about tech can be just as important as making it. Developers spend plenty of time creating new applications and debugging existing codebases, but most developers also spend at least some of their time reading and writing about technical concepts!!"
    },
    { //2
        userid: 2,
        postbody: "Writing about tech can be just as important as making it. Developers spend plenty of time creating new applications and debugging existing codebases, but most developers also spend at least some of their time reading and writing about technical concepts!!"
    },
];

const seedPost = () => Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true
});

module.exports = seedPost;