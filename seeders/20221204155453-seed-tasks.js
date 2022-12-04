"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tasks",
      [
        {
          ProjectId: 1,
          tittle: "goal with the ear",
          details: "score a goal with my ear",
        },
        {
          ProjectId: 1,
          tittle: "free kick goal",
          status: true,
        },
        {
          ProjectId: 2,
          tittle: "Olympic goal",
          details: "score a goal from the corner kick",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tasks", null, {});
  },
};
