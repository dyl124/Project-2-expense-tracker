const sequelize = require('../config/connection');
const { User, Income, IncomeType, Client, Expense, ExpenseType, Vendor } = require('../models');

const userData = require('./userData.json');
const incomeData = require('./incomeData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Seed User data
  await User.bulkCreate(userData);

  // Seed Income data
  await Income.bulkCreate(incomeData);

  // Seed Client data
  await Client.bulkCreate(clientData);

  // Seed Vendor data
  await Vendor.bulkCreate(vendorData);

  // Seed IncomeType data
  await IncomeType.bulkCreate(incomeTypeData);

  // Seed Expense data
  await Expense.bulkCreate(expenseData);

  // Seed ExpenseType data
  await ExpenseType.bulkCreate(expenseTypeData);

  process.exit(0);
};

seedDatabase();
