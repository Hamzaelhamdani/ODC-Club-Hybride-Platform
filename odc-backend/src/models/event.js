const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Event = sequelize.define('Event', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  date: { type: DataTypes.DATE },
  end_date: { type: DataTypes.DATE },
  time: { type: DataTypes.STRING },
  location: { type: DataTypes.STRING },
  city: { type: DataTypes.STRING },
  type: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
  priority: { type: DataTypes.STRING },
  category: { type: DataTypes.STRING },
  organizer: { type: DataTypes.STRING },
  expected_attendees: { type: DataTypes.INTEGER },
  registered_attendees: { type: DataTypes.INTEGER },
  budget: { type: DataTypes.INTEGER },
  spent_budget: { type: DataTypes.INTEGER },
  club_id: { type: DataTypes.INTEGER },
  regions: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
  tags: { type: DataTypes.ARRAY(DataTypes.TEXT) },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'events',
  timestamps: false,
});

module.exports = Event; 