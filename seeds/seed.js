const sequelize = require('../config/connection');
const { User, Income, IncomeType, Client, Expense, ExpenseType, Vendor } = require('../models');

const userData = require('./userData.json');
const incomeData = require('./incomeData.json');
const incomeTypeData = require('./incomeTypeData.json');
const clientData = require('./clientData.json');
const expenseData = require('./expenseData.json');
const expenseTypeData = require('./expenseTypeData.json');
const vendorData = require('./vendorData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Seed User data
  await User.bulkCreate(userData);

  // Seed IncomeType data
  await IncomeType.bulkCreate(incomeTypeData);

  // Seed Client data
  await Client.bulkCreate(clientData);

  // Seed Income data
  await Income.bulkCreate(incomeData);

  // Seed ExpenseType data
  await ExpenseType.bulkCreate(expenseTypeData);

  // Seed Vendor data
  await Vendor.bulkCreate(vendorData);

  // Seed Expense data
  await Expense.bulkCreate(expenseData);

  process.exit(0);
};

seedDatabase();
