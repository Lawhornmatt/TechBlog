const { Generic } = require('../models');

const genericData = [
    { //1
        data: 'RADA RADA',
        foreignData: 1
    },
    { //2
        data: 'YADA YADA',
        foreignData: 2
    },
];

const seedGeneric = () => Generic.bulkCreate(genericData, {
    individualHooks: true,
    returning: true
});

module.exports = seedGeneric;