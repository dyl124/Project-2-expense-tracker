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
      type: DataTypes.BOOLEAN,
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
    type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'expense_type',
        key: 'id',
      },
      allowNull: false,
    },
    vendor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'vendor',
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
