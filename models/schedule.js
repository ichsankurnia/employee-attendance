'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    static associate(models) {
        Schedule.belongsTo(models.Employee, { foreignKey: 'employeeId', as: 'employees' });
        Schedule.belongsTo(models.Shift, { foreignKey: 'shiftId', as: 'shifts' });
    }
  };
  Schedule.init({
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'EmployeeId is required'
          },
          notEmpty: {
            args: true,
            msg: 'EmployeeId is required'
          },
          isInt: {
            args: true,
            msg: 'EmployeeId has to be an integer'
          }
        }
    },
    shiftId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'shiftId is required'
          },
          notEmpty: {
            args: true,
            msg: 'shiftId is required'
          },
          isInt: {
            args: true,
            msg: 'shiftId has to be an integer'
          }
        }
      },
      date: {
        type: DataTypes.STRING,
        defaultValue: "",
        },
    desc: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};