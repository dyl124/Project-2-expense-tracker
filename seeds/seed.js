const sequelize = require('../config/connection');
const { TableOne, TableTwo } = require('../models');

const tableOneData = require('./tableOneData.json');
const tableTwoData = require('./tableTwoData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Write Seeds calling on data in required jsons above (lines 4 & 5)

  process.exit(0);
};

seedDatabase();
