'use strict';
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users',
      [
        {
          id: 1,
          name: 'admin',
          isAdmin: true,
          email: 'admin123@gmail.com',
          phone: '0785634322',
          password: bcrypt.hashSync('123pass', 10), // Provide the desired salt rounds, e.g., 10
          createdAt: '2023-04-14T09:01:38.932Z',
          updatedAt: '2023-04-14T09:01:38.932Z'
        },
      ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
