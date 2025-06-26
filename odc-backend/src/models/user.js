const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING },
  role: { type: DataTypes.ENUM('super_admin', 'country_admin', 'regional_admin', 'club_manager', 'expert', 'coach', 'student'), allowNull: false },
  country_code: { type: DataTypes.STRING },
  region_id: { type: DataTypes.INTEGER },
  university: { type: DataTypes.STRING },
  club_id: { type: DataTypes.INTEGER },
  admin_level: { type: DataTypes.STRING },
  is_demo: { type: DataTypes.BOOLEAN, defaultValue: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'users',
  timestamps: false,
});

module.exports = User; 