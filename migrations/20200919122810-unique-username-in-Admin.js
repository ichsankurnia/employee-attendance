'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Admins', {
      fields: ['username'],
      type: 'unique',
      name: 'unique-username-in-Admins'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Admins', 'unique-username-in-Admins')
  }
};
