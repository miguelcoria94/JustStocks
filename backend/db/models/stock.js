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
    static async addStock(symbol) {
      const stock = await Stock.create({
        symbol
      });
    }

    static async getStockSymbol(stockId) {
      const stock = await Stock.findOne({
        where: {
          id: stockId,
        },
      });
      return stock
    }

    static async findAStock({ symbol }) {
      const stock = await Stock.findOne({
        where: {
          symbol: symbol.toLowerCase()
        }
      });
      return stock.id;
    }

    static associate(models) {
      const cloumnMapping = {
        through: "WatchList",
        otherKey: "userId",
        foreignKey: "stockId",
      };
      this.belongsToMany(models.User, cloumnMapping);
    }
  };
  Stock.init({
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Stock',
  });
  return Stock;
};