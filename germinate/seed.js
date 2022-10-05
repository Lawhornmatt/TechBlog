const sequelize = require('../config/connection');
const genericData = require('./genericData');

async function seedDatabase() {
    await sequelize.sync({ force: true });
    await genericData();
}

seedDatabase();