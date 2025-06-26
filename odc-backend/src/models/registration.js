const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Registration = sequelize.define('Registration', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER },
  club_id: { type: DataTypes.INTEGER },
  region_id: { type: DataTypes.INTEGER },
  type: { type: DataTypes.STRING },
  status: { type: DataTypes.ENUM('pending', 'approved', 'rejected', 'interview', 'waitlist') },
  applied_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  reviewed_at: { type: DataTypes.DATE },
  motivation: { type: DataTypes.TEXT },
  experience: { type: DataTypes.TEXT },
  references: { type: DataTypes.ARRAY(DataTypes.TEXT) },
}, {
  tableName: 'registrations',
  timestamps: false,
});

module.exports = Registration; 