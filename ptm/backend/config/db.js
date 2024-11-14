const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize('task_manager', 'root', 'Om7249@123', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log,  // Logs all SQL queries
});

module.exports = sequelize;
