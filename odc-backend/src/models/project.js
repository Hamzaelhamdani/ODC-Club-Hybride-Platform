const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Project = sequelize.define('Project', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  club_id: { type: DataTypes.INTEGER },
  status: { type: DataTypes.ENUM('idea', 'prototype', 'submitted', 'shortlisted', 'finalist', 'completed') },
  theme_tags: { type: DataTypes.ARRAY(DataTypes.TEXT) },
  mentor_id: { type: DataTypes.INTEGER },
  next_deadline: { type: DataTypes.DATE },
  submitted_to: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'projects',
  timestamps: false,
});

module.exports = Project; 