'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Contract_Service', {
      id: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
     
      agreedFee: Sequelize.STRING,
      ContractId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Contract",
          key: "id",
        },
      },
      ServiceId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Service",
          key: "id",
        },
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
    await queryInterface.dropTable('Contract_Service');
  }
};