const User = require('./User');
const Income = require('./Income');
const Expense = require('./Expense');
// Potentially also IncomeType, ExpenseType, Client and Vendor models?
const IncomeType = require('./IncomeType');
const ExpenseType = require('./ExpenseType');
const Client = require('./Client');
const Vendor = require('./Vendor');


User.hasMany(Income, { foreignKey: 'user_id' });
User.hasMany(Expense, { foreignKey: 'user_id' });
User.hasMany(Client, { foreignKey: 'user_id' });
User.hasMany(Vendor, { foreignKey: 'user_id' });
User.hasMany(IncomeType, { foreignKey: 'user_id' });
User.hasMany(ExpenseType, { foreignKey: 'user_id' });

Income.belongsTo(User, { foreignKey: 'user_id' });
Expense.belongsTo(User, { foreignKey: 'user_id' });
Client.belongsTo(User, { foreignKey: 'user_id' });
Vendor.belongsTo(User, { foreignKey: 'user_id' });
IncomeType.belongsTo(User, { foreignKey: 'user_id' });
ExpenseType.belongsTo(User, { foreignKey: 'user_id' });

IncomeType.hasMany(Income, { foreignKey: 'type_id' });
ExpenseType.hasMany(Expense, { foreignKey: 'type_id' });

Income.belongsTo(IncomeType, { foreignKey: 'type_id' });
Expense.belongsTo(ExpenseType, { foreignKey: 'type_id' });

Income.belongsTo(Client, { foreignKey: 'client_id' });
Expense.belongsTo(Vendor, { foreignKey: 'vendor_id' });

Client.hasMany(Income, { foreignKey: 'client_id' });
Vendor.hasMany(Expense, { foreignKey: 'vendor_id' });

module.exports = { User, Income, Expense, IncomeType, ExpenseType, Client, Vendor };