'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Stocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      symbol: {
        type: Sequelize.STRING
      },
      assetType: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      exchange: {
        type: Sequelize.STRING
      },
      sector: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.TEXT
      },
      employees: {
        type: Sequelize.INTEGER
      },
      marketCap: {
        type: Sequelize.BIGINT
      },
      fiftytwoweekhigh: {
        type: Sequelize.INTEGER
      },
      fiftytwoweeklow: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Stocks');
  }
};