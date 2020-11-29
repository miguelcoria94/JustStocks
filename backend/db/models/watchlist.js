'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WatchList extends Model {
    static async getCurrentWatchlist({ id }) {
      const watchlist = await WatchList.findAll({
        where: {
          userId: id,
        },
      });
      return watchlist;
    }

    static async addStock(id, stockToFind) {
      const AlreadyExist = await WatchList.findOne({
        where: {
          userId: id,
          stockId: stockToFind,
        },
      });

      if (AlreadyExist) {
        return;
      } else {
        const stock = await WatchList.create({
          userId: id,
          stockId: stockToFind,
        });
      }
    }
    static associate(models) {
      // define association here
    }
  };
  WatchList.init({
    userId: DataTypes.INTEGER,
    stockId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'WatchList',
  });
  return WatchList;
};