const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Jours = require('./Jours');

const Semaine = sequelize.define('Semaine', {
  numero: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  jours: {
    type: DataTypes.JSONB,
    allowNull: false
  }
});

// Relations
Semaine.belongsToMany(Jours, { through: 'SemaineJours', foreignKey: 'semaineId' });

module.exports = Semaine;
