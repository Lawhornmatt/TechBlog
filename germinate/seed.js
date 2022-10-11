const sequelize = require('../config/connection');
const userData = require('./userData');
const postData = require('./postData');
const commentData = require('./commentData');

async function seedDatabase() {
    await sequelize.sync({ force: true });
    await userData();
    await postData();
    await commentData();
}

seedDatabase();