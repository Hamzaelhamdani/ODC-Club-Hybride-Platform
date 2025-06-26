const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Country = sequelize.define('Country', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  code: { type: DataTypes.STRING, allowNull: false, unique: true },
  continent: { type: DataTypes.STRING },
  clubs: { type: DataTypes.INTEGER, defaultValue: 0 },
  projects: { type: DataTypes.INTEGER, defaultValue: 0 },
  odciens: { type: DataTypes.INTEGER, defaultValue: 0 },
  admin_status: { type: DataTypes.STRING },
  last_updated: { type: DataTypes.DATE },
  admin_name: { type: DataTypes.STRING },
  admin_email: { type: DataTypes.STRING },
}, {
  tableName: 'countries',
  timestamps: false,
});

module.exports = Country; 