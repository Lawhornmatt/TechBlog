const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Generic extends Model {}

Generic.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    data: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    foreignData: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: 'something_else',
        //     key: 'id'
        // },
    }},
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'generic'
});

module.exports = Generic;