"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "authors",
      [
        {
          name: "Author 1",
          age: 30,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Author 2",
          age: 20,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Author 3",
          age: 60,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("authors", null, {});
  },
};
