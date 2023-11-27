// Remember to change name of Model/Table to suit - e.g. class User [instead of TableTwo] extends Model {}

const { Model, DataTypes } = require('sequelize');
// const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class TableTwo extends Model {
  // If to be used for handling user data, add becrypt here:
  // checkPassword(loginPw) {
  //   return bcrypt.compareSync(loginPw, this.password);
  // }
}

// Define TableTwo Model Columns.
// EG, if used for user data:
TableTwo.init(
  // {
  //   id: {
  //     type: DataTypes.INTEGER,
  //     allowNull: false,
  //     primaryKey: true,
  //     autoIncrement: true,
  //   },
  //   name: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //   },
  //   email: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //     unique: true,
  //     validate: {
  //       isEmail: true,
  //     },
  //   },
  //   password: {
  //     type: DataTypes.STRING,
  //     allowNull: false,
  //     validate: {
  //       len: [8],
  //     },
  //   },
  // If foreign keys are required, see following example and remember to add relationships in models/index.js
  // TableOne_id: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: 'tableOne',
  //     key: 'id',
  //   },
  // },
  // },
  {
    // Add hooks, e.g. if used for user data:
    // hooks: {
    //   beforeCreate: async (newUserData) => {
    //     newUserData.password = await bcrypt.hash(newUserData.password, 10);
    //     return newUserData;
    //   },
    //   beforeUpdate: async (updatedUserData) => {
    //     updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
    //     return updatedUserData;
    //   },
    // },
    // Further options, e.g.
    // sequelize,
    // timestamps: false,
    // freezeTableName: true,
    // underscored: true,
    // modelName: 'tableTwo', // Change name
  }
);

module.exports = TableTwo;
