const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.MYSQL_URI, {
  dialect: 'mysql',
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connected');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
