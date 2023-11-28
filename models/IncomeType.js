const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class IncomeType extends Model {}

IncomeType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // What other fields do we need specific to IncomeType, if any?
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
    modelName: 'income_type',
  }
);

module.exports = IncomeType;
