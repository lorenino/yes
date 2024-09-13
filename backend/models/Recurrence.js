const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Recurrence = sequelize.define('Recurrence', {
  numero: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Recurrence;
