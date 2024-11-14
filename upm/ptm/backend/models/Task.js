const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('../models/user'); // Import the User model

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed'),
    allowNull: false,
    defaultValue: 'pending'
  },
  priority: {
    type: DataTypes.ENUM('high', 'medium', 'low'),
    allowNull: false,
    defaultValue: 'medium'
  },
});

// Establishing the relationship with the User model
Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = Task;
