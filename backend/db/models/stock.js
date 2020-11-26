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
    static async addStock({ symbol }) {
      const user = await User.create({
        symbol
      });
      return await Stock.scope("currentStock").findByPk(stock.id);
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