'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shift extends Model {
    static associate(models) {
      Shift.hasMany(models.Attendance, { foreignKey: 'id', as: 'attendances' });
      Shift.hasMany(models.Schedule, { foreignKey: 'id', as: 'schedules' });
    }
  };
  Shift.init({
    shift_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Shift name is required'
        },
        notEmpty: {
          args: true,
          msg: 'Shift name is required'
        }
      }
    },
    shift_desc: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    min_check_in: {
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
    max_check_in: {
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
    min_check_out: {
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
      max_check_out: {
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
  }, {
    sequelize,
    modelName: 'Shift',
  });
  return Shift;
};