const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ClubMembership = sequelize.define('ClubMembership', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER },
  club_id: { type: DataTypes.INTEGER },
  role_in_club: { type: DataTypes.ENUM('member', 'manager', 'developer', 'designer', 'business') },
  status: { type: DataTypes.ENUM('active', 'pending', 'inactive') },
  joined_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'club_memberships',
  timestamps: false,
});

module.exports = ClubMembership; 