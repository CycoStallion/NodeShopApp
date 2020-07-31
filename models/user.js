const Sequelize = require('sequelize');

const sequelize = require('../utils/database');
const { model } = require('../utils/database');

const User = sequelize.define('user', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.DataTypes.STRING,
        allowNull: true
    }
});

module.exports = User;