'use strict';

const { Unique } = require('sequelize-typescript');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      cost: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      stockQty: {
        type: Sequelize.INTEGER
      },
      kgAcre: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        default: true,
        allowNull: false
      },
      category: {
        type: Sequelize.ENUM('fertilizers', 'seed'),
        allowNull: false
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};