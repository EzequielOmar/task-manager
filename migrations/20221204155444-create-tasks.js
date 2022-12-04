"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tasks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ProjectId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      tittle: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      details: {
        allowNull: true,
        type: Sequelize.STRING(100),
      },
      status: {
        allowNull: true,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tasks");
  },
};