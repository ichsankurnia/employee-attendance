'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Employees', {
      fields: ['nik'],
      type: 'unique',
      name: 'unique_constraint_nik'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Employees', 'unique_constraint_nik')
  }
};
