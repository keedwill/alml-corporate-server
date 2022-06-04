'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Proforma_Service', {
      id: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      ProformaId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Proforma",
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
    await queryInterface.dropTable('Proforma_Service');
  }
};