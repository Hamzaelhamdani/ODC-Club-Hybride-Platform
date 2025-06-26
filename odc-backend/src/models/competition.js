const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Competition = sequelize.define('Competition', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  deadline: { type: DataTypes.DATE },
  start_date: { type: DataTypes.DATE },
  submissions: { type: DataTypes.INTEGER, defaultValue: 0 },
  participants: { type: DataTypes.INTEGER, defaultValue: 0 },
  countries: { type: DataTypes.ARRAY(DataTypes.TEXT) },
  status: { type: DataTypes.ENUM('active', 'judging', 'closed') },
  phase: { type: DataTypes.ENUM('Registration', 'Submission', 'Judging', 'Completed') },
  jury_status: { type: DataTypes.ENUM('Assigned', 'Pending') },
  judge_count: { type: DataTypes.INTEGER, defaultValue: 0 },
  winners_announced: { type: DataTypes.BOOLEAN, defaultValue: false },
  prizes: { type: DataTypes.STRING },
}, {
  tableName: 'competitions',
  timestamps: false,
});

module.exports = Competition; 