const User = require('./User');
const Income = require('./Income');
const Expense = require('./Expense');
const IncomeType = require('./IncomeType');
const ExpenseType = require('./ExpenseType');
const Client = require('./Client');
const Vendor = require('./Vendor');

// A user can have many incomes, expenses, clients, vendors, income types, and expense types.
User.hasMany(Income, { foreignKey: 'user_id' });
User.hasMany(Expense, { foreignKey: 'user_id' });
User.hasMany(Client, { foreignKey: 'user_id' });
User.hasMany(Vendor, { foreignKey: 'user_id' });
User.hasMany(IncomeType, { foreignKey: 'user_id' });
User.hasMany(ExpenseType, { foreignKey: 'user_id' });

// income & type, expense & type, client, and vendor belong to a user.
Income.belongsTo(User, { foreignKey: 'user_id' });
Expense.belongsTo(User, { foreignKey: 'user_id' });
Client.belongsTo(User, { foreignKey: 'user_id' });
Vendor.belongsTo(User, { foreignKey: 'user_id' });
IncomeType.belongsTo(User, { foreignKey: 'user_id' });
ExpenseType.belongsTo(User, { foreignKey: 'user_id' });

//Income type and expense type have many incomes or expenses, respectively.
IncomeType.hasMany(Income, { foreignKey: 'type_id' });
ExpenseType.hasMany(Expense, { foreignKey: 'type_id' });

//Income and expense belong to an income type or expense type, respectively.
Income.belongsTo(IncomeType, { foreignKey: 'type_id' });
Expense.belongsTo(ExpenseType, { foreignKey: 'type_id' });

// Income belongs to a client, and an expense belongs to a vendor.
Income.belongsTo(Client, { foreignKey: 'client_id' });
Expense.belongsTo(Vendor, { foreignKey: 'vendor_id' });

// A Client has (or theoretically, provides) income, and a vendor "has" expense
Client.hasMany(Income, { foreignKey: 'client_id' });
Vendor.hasMany(Expense, { foreignKey: 'vendor_id' });

module.exports = { User, Income, Expense, IncomeType, ExpenseType, Client, Vendor };