const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Sujet = sequelize.define('Sujet', {
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

module.exports = Sujet;
