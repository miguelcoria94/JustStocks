'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Stock.init({
    symbol: DataTypes.STRING,
    assetType: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    exchange: DataTypes.STRING,
    sector: DataTypes.STRING,
    address: DataTypes.TEXT,
    employees: DataTypes.INTEGER,
    marketCap: DataTypes.BIGINT,
    fiftytwoweekhigh: DataTypes.INTEGER,
    fiftyweeklow: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Stock',
  });
  return Stock;
};