const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('proj_aula', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

module.exports = sequelize;