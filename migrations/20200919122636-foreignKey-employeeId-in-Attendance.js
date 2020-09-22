'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Attendances', {
      fields: ['employeeId'],
      type: 'foreign key',
      name: 'foreignKey_employeeId-Attendances',
      references: {
        table: 'Employees',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Attendances', 'foreignKey_employeeId-Attendances');
  }
};
