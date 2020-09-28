'use strict';
const {
  Model
} = require('sequelize');
const { BcryptHelper } = require('../helpers');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      Employee.hasMany(models.Attendance, { foreignKey: 'id', as: 'attendances' });
      Employee.hasMany(models.Schedule, { foreignKey: 'id', as: 'schedules' });
    }
  };
  Employee.init({
    nik: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'NIK is required'
        },
        notEmpty: {
          args: true,
          msg: 'NIK is required'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Name is required'
        },
        notEmpty: {
          args: true,
          msg: 'Name is required'
        }
      }
    },
    position: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Username is required'
        },
        notEmpty: {
          args: true,
          msg: 'Username is required'
        },
        len: {
          args: [5],
          msg: 'Username has minimal 5 characters'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password is required'
        },
        notEmpty: {
          args: true,
          msg: 'Password is required'
        },
        len: {
          args: [5],
          msg: 'Password has minimum 5 characters'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Employee',
    hooks: {
      beforeCreate(employee, options) {
        employee.password = BcryptHelper.hashingPassword(employee.password)
      },
    }
  });
  return Employee;
};