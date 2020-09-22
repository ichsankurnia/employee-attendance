'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Employees', {
      fields: ['username'],
      type: 'unique',
      name: 'unique-username-in-Employee'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Employees', 'unique-username-in-Employee')
  }
};
