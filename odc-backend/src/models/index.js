const { Sequelize } = require('sequelize');
const { sequelize } = require('../config/database');

// Import all models
const User = require('./user');
const Country = require('./country');
const Region = require('./region');
const Club = require('./club');
const ClubMembership = require('./clubMembership');
const Project = require('./project');
const Competition = require('./competition');
const Event = require('./event');
const Registration = require('./registration');
const FocusArea = require('./focusArea');
const ClubFocusArea = require('./clubFocusArea');

// Define associations here (to be filled after all models are created)
// ...

module.exports = {
  sequelize,
  Sequelize,
  User,
  Country,
  Region,
  Club,
  ClubMembership,
  Project,
  Competition,
  Event,
  Registration,
  FocusArea,
  ClubFocusArea,
}; 