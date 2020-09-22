'use strict';
const {
  Model
} = require('sequelize');
const { BcryptHelper } = require('../helpers');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {
      // define association here
    }
  };
  Admin.init({
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
    }
  }, {
    sequelize,
    modelName: 'Admin',
    hooks: {
      beforeCreate(user, options) {
        user.password = BcryptHelper.hashingPassword(user.password)
      },
    }
  });
  return Admin;
};