const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ClubFocusArea = sequelize.define('ClubFocusArea', {
  club_id: { type: DataTypes.INTEGER, primaryKey: true },
  focus_area_id: { type: DataTypes.INTEGER, primaryKey: true },
}, {
  tableName: 'club_focus_areas',
  timestamps: false,
});

module.exports = ClubFocusArea; 