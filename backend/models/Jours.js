const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Taches = require('./Taches');

const Jours = sequelize.define('Jours', {
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
Jours.belongsTo(Taches, { foreignKey: 'tachesId' });

module.exports = Jours;
