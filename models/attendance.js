'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    static associate(models) {
      Attendance.belongsTo(models.Employee, { foreignKey: 'employeeId', as: 'employees' });
      Attendance.belongsTo(models.Shift, { foreignKey: 'shiftId', as: 'shifts' });
    }
  };
  Attendance.init({
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
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Type is required'
        },
        notEmpty: {
          args: true,
          msg: 'Type is required'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Status is required'
        },
        notEmpty: {
          args: true,
          msg: 'Status is required'
        }
      }
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Time is required'
        },
        notEmpty: {
          args: true,
          msg: 'Time is required'
        }
      }
    },
    timestamp: {
      type: DataTypes.STRING,
      defaultValue: new Date().getTime()
    },
    attendance_desc: DataTypes.STRING,
    geolocation: DataTypes.TEXT,
    ipAddress: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};