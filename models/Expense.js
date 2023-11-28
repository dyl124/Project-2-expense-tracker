const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Expense extends Model {}

Expense.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING, // STRING will allow dynamic types, but limit our queries - see comments in Income model
      allowNull: false,
    },
    // An example of how we could link to an expense_type model. See comments in Income under 'types'
    type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'expense_type',
        key: 'id',
      },
      allowNull: false,
    },
    // Vendor/supplier
    // AS per Income, consider using a foreign key to link to a separate Vendor model if needed
    vendor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    invoice_id: {
      type: DataTypes.STRING,
      unique: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    issue_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.ENUM('Pending', 'Payed', 'Overdue'), // see comments in Income model
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'expense',
  }
);

module.exports = Expense;
