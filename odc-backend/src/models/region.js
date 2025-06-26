const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Region = sequelize.define('Region', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  country_code: { type: DataTypes.STRING },
  admin_name: { type: DataTypes.STRING },
  admin_email: { type: DataTypes.STRING },
  admin_status: { type: DataTypes.STRING },
  admin_last_login: { type: DataTypes.DATE },
  performance: { type: DataTypes.INTEGER },
}, {
  tableName: 'regions',
  timestamps: false,
});

module.exports = Region; 