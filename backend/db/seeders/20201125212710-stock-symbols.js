'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Stocks",
      [
        {
          symbol: "appl",
        },
        {
          symbol: "amzn",
        },
        {
          symbol: "nflx",
        },
        {
          symbol: "googl",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Stocks",
      {
        symbol: { [Op.in]: ["appl", "amzn", "nflx", "googl"] },
      },
      {}
    );
  },
};
