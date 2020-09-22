'use strict';
const { hashingPassword } = require('../helpers/bcrypt');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Admins', [
      {
        username: 'admin',
        password: hashingPassword('admin'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Admins', null, {})
  }
};
