const jwt = require('jsonwebtoken');
const { Admin, Employee } = require('../models');
require('dotenv').config()

async function isAdminAuthenticated (req, res, next) {
  try {
    const bearerHeader = req.headers.authorization;

    if (bearerHeader) {
      let bearer = bearerHeader.split(' ')[0];
      let token = bearerHeader.split(' ')[1];
      if (bearer == 'Bearer' && token) {
        let decoded = jwt.verify(token, process.env.SECRET);
        const admin = await Admin.findOne({
          where: {
            id: decoded.id
          }
        });
        
        if (admin) {
          req.decoded = decoded.id;
          return next();
        } else {
          return next({
            status: 401,
            name: 'Unauthorized',
            message: 'Please login first'
          });
        }
      } else {
        return next({
          status: 401,
          name: 'Unauthorized',
          message: 'Invalid bearer token format'
        });
      }
    } else {
      return next({
        status: 401,
        name: 'Unauthorized',
        message: 'Please login first'
      });
    }
  } catch (err) {
    return next(err);
  } 
}

async function isEmployeeAuthenticated (req, res, next) {
  try {
    const bearerHeader = req.headers.authorization;

    if (bearerHeader) {
      let bearer = bearerHeader.split(' ')[0];
      let token = bearerHeader.split(' ')[1];
      if (bearer == 'Bearer' && token) {
        let decoded = jwt.verify(token, process.env.SECRET);
        const employee = await Employee.findOne({
          where: {
            id: decoded.id
          }
        });
        
        if (employee) {
          req.decoded = decoded.id;
          return next();
        } else {
          return next({
            status: 401,
            name: 'Unauthorized',
            message: 'Please login first'
          });
        }
      } else {
        return next({
          status: 401,
          name: 'Unauthorized',
          message: 'Invalid bearer token format'
        });
      }
    } else {
      return next({
        status: 401,
        name: 'Unauthorized',
        message: 'Please login first'
      });
    }
  } catch (err) {
    return next(err);
  } 
}

module.exports = {
  isAdminAuthenticated,
  isEmployeeAuthenticated
};