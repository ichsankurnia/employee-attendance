const errorHandler = (err, req, res, next) => {
  console.log(err);
  const errors = [];
  switch (err.name) {
    case 'SequelizeValidationError':
      status = 400;
      for (const e of err.errors) {
        errors.push(e.message)
      }
      res.status(400).json({
        name: 'BadRequest',
        message: 'Input Error',
        errors
      });
      break;
    case 'SequelizeUniqueConstraintError':
      status = 400;
      for (const e of err.errors) {
        errors.push(e.message)
      }
      res.status(status).json({
        name: 'BadRequest',
        message: 'Unique Validation',
        errors
      });
      break;
    case 'SequelizeForeignKeyConstraintError':
      status = 400;
      res.status(status).json({
        name: 'BadRequest',
        message: 'Foreign Key Constraint',
        errors: [err.parent.detail]
      });
      break;
    case 'Unauthorized':
      status = err.status;
      res.status(status).json({
        name: 'Unauthorized',
        message: err.message
      });
      break;
    case 'LoginFailed':
      status = err.status;
      res.status(status).json({
        name: 'LoginFailed',
        message: err.message
      });
      break;
    case 'NotFound':
      status = err.status;
      res.status(status).json({
        name: err.name,
        message: err.message
      });
      break;
    case 'JsonWebTokenError':
      status = 401;
      res.status(status).json({
        name: 'Unauthorized',
        message: 'Please login first'
      });
      break;
    case 'NotEnoughStock':
      status = 400;
      res.status(status).json({
        name:'NotEnoughStock',
        message: 'Not enough stock',
        errors: err.errors
      });
      break;
    case 'BadRequest':
      status = err.status;
      res.status(status).json({
        name: err.name,
        message: 'Input Error',
        error: err.message
      });
      break;
    default:
      status = 500;
      res.status(status).json({
        name: err.name,
        message: err.message,
        error: err.message
      });
      break;
  }
}

module.exports = errorHandler;
