const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Recurrence = require('./Recurrence');
const Sujet = require('./Sujet');

const Taches = sequelize.define('Taches', {
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

// Relations
Taches.belongsTo(Recurrence, { foreignKey: 'recurrenceId' });
Taches.belongsTo(Sujet, { foreignKey: 'sujetId' });

module.exports = Taches;
