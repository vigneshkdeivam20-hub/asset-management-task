
require('dotenv').config({
  path: require('path').resolve(__dirname, '../.env')
});

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const { sequelize } = require('../config/database');

const db = {};

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      !file.startsWith('.') &&
      file !== basename &&
      file.endsWith('.js') &&
      file !== 'index.js'
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );

    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (typeof db[modelName].associate === 'function') {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
