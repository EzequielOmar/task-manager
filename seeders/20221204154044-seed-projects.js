"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Projects",
      [
        {
          UserId: 2,
          title: "All goals to do from Lio",
          details: "Folder with all my goals to do",
          createdAt: "2022-04-11",
          updatedAt: "2022-04-11",
        },
        {
          UserId: 3,
          title: "All goals to do from Killian",
          createdAt: "2022-04-11",
          updatedAt: "2022-04-11",
        },
        {
          UserId: 3,
          title: "All runs to do from Killian",
          details: "Folder with all my runs to do",
          createdAt: "2022-04-11",
          updatedAt: "2022-04-11",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Projects", null, {});
  },
};
