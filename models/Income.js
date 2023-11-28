const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Income extends Model {}

// Define Income Model Columns.
Income.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Set list options using ENUMeration: https://sequelize.org/docs/v7/models/data-types/#enums
    // given we have clients, do we need income types?
    // If we do, and we want users to be able to add their own types, we may need an IncomeType model and link typeId as a foreign key
    type: {
      type: DataTypes.ENUM('sales', 'services'), // Expand list with types we want - possibly allow user to generate?
      allowNull: false,
    },
    // customer or client - do we want a pre-defined list that allows user to add to, or have strings at risk of not being entered the same
    // This is probably not scalable - we might want to consider making a seperate model for this
    customer: {
      type: DataTypes.ENUM('Customer 1', 'Customer 2', 'Customer 3'), // Expand list with types we want - possibly allow user to generate?
      allowNull: false,
    },
    invoice_id: {
      type: DataTypes.STRING,
      unique: true, // Want unique = true? What about null?
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    // DATEONLY omits time component in DATE type, simplifying our data.
    issue_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false, // Allow nulls?
    },
    // Whether or not payment has been recieved - helpful for checking against due-date
    // COuld aslo consider using type_ENUM for more details about payment status, eg. DataTypes.ENUM('Pending', 'Received', 'Overdue'),
    payment_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false, // Allow nulls?
    },
    description: {
      type: DataTypes.STRING,
    },
    // Foreign keys:
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'income',
  }
);

module.exports = Income;
