const sequelize = require('../config/connection');
const userData = require('./userData');
const postData = require('./postData');

async function seedDatabase() {
    await sequelize.sync({ force: true });
    await userData();
    await postData();
}

seedDatabase();