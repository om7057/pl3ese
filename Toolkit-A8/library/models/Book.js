const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  yearOfPublication: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Book;
