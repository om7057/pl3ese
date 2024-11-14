// config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('profile_management', process.env.DB_USER, process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;
