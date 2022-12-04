"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Tito",
          lastName: "Lewandowski",
          email: "thetitolewa@gmail.com",
          password: "$2b$06$lib6n39B8EYGc/DCmj11peFBwLX/bF8lRKqbLh3zmP.N2321x6vU.",//*thetitolewa
          createdAt: "2022-04-11",
          updatedAt: "2022-04-11",
        },
        {
          firstName: "Lionel Andrés",
          lastName: "Messi",
          email: "liomessi10@gmail.com",
          password: "$2b$06$St6yL75GfhyCOTvl6uyY7eHURJgdZXayqk/eWhxSzjRS.r4dSwXgK",//*liomessi10
          createdAt: "2022-04-11",
          updatedAt: "2022-04-11",
        },
        {
          firstName: "Killian",
          lastName: "Mbappe",
          email: "turtlembappe@gmail.com",
          password: "$2b$06$u3UsrD3EZQEHq8nYY7JAXultipgzXm2cJm4CfxV2oTB8ww5h3nDSK",//*turtlembappe
          createdAt: "2022-04-11",
          updatedAt: "2022-04-11",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
