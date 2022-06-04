'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Category", "image", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "",
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Category", "image", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "",
    });
  }
};
