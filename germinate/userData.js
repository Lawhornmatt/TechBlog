const { User } = require('../models');

const userData = [
    { //1
        username: 'JohnnyMo1',
        email: "nuclear@test.com",
        password: "password"
    },
    { //2
        username: 'Hezzy',
        email: "hezzy@test.com",
        password: "password"
    },
];

const seedUser = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
});

module.exports = seedUser;