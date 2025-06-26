const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Club = sequelize.define('Club', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  country_code: { type: DataTypes.STRING },
  region_id: { type: DataTypes.INTEGER },
  city: { type: DataTypes.STRING },
  university: { type: DataTypes.STRING },
  status: { type: DataTypes.ENUM('pending', 'active', 'archived') },
  team_leader_name: { type: DataTypes.STRING },
  team_leader_email: { type: DataTypes.STRING },
  focus_areas: { type: DataTypes.ARRAY(DataTypes.TEXT) },
  vision: { type: DataTypes.TEXT },
  objectives: { type: DataTypes.TEXT },
  expected_support: { type: DataTypes.TEXT },
  description: { type: DataTypes.TEXT },
  goals: { type: DataTypes.TEXT },
  founded: { type: DataTypes.STRING },
  logo: { type: DataTypes.STRING },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'clubs',
  timestamps: false,
});

module.exports = Club; 