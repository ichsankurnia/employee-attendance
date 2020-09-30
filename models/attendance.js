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
    day: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Date is required'
        },
        notEmpty: {
          args: true,
          msg: 'Date is required'
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
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    attendance_desc: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};