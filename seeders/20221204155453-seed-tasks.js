"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tasks",
      [
        {
          ProjectId: 1,
          title: "goal with the ear",
          description: "score a goal with my ear",
        },
        {
          ProjectId: 1,
          title: "free kick goal",
          done: true,
        },
        {
          ProjectId: 2,
          title: "Olympic goal",
          description: "score a goal from the corner kick",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tasks", null, {});
  },
};
