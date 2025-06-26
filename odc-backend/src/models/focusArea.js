const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const FocusArea = sequelize.define('FocusArea', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
}, {
  tableName: 'focus_areas',
  timestamps: false,
});

module.exports = FocusArea; 