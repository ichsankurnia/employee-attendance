const { Admin } = require('../models');
const { BcryptHelper, JWTHelper } = require('../helpers');

class AdminController {
  static async login(req, res, next) {
    try {
      const input = {
        username: req.body.username,
        password: req.body.password
      }
  
      const admin = await Admin.findOne({
        where: {
          username: input.username
        }
      });

      const isValid = BcryptHelper.validatePassword(input.password, admin.password);

      if (isValid) {
        const payload = {
          id: admin.id,
          username: admin.username
        }

        const access_token = JWTHelper.signToken(payload);

        return res.status(200).json({
          access_token,
          message: 'Login success'
        });
      } else {
        return next({
          status: 400,
          name: 'LoginFailed',
          error: 'Email / password is incorrect'
        });
      }
    } catch (err) {
      return next(err);
    }
  }

  static async findOne(req, res, next) {
    try {
      const id = req.decoded;

      const admin = await Admin.findOne({
        where: {
          id
        }
      });
      
      return res.status(200).json({
        name: admin.name,
        username: admin.username
      });
    } catch (err) {
      return next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const input = {
        username: req.body.username,
        password: req.body.password
      }

      const admin = await Admin.create(input);

      return res.status(201).json({
        id: admin.id,
        username: admin.username,
        message: 'Admin created'
      });
    } catch (err) {
      return next(err);
    }
   
  }
}

module.exports = AdminController;
