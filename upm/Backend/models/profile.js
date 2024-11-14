// models/profile.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Profile = sequelize.define('Profile', {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profilePicture: {
    type: DataTypes.STRING, // Stores file path
    allowNull: true
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
});

User.hasOne(Profile, { foreignKey: 'userId', onDelete: 'CASCADE' });
Profile.belongsTo(User, { foreignKey: 'userId' });

module.exports = Profile;
