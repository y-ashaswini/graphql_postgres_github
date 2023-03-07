'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('books', [{
      name: "Book 1",
      genre: "Genre 1",
      authorId: "1",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Book 2",
      genre: "Genre 2",
      authorId: "2",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Book 3",
      genre: "Genre 3",
      authorId: "3",
      createdAt: new Date(),
      updatedAt: new Date()
    },        
    {
      name: "Book 4",
      genre: "Genre 2",
      authorId: "1",
      createdAt: new Date(),
      updatedAt: new Date()
    },], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('books', null, {});
  }
};
