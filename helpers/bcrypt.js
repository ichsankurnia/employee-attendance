const bcrypt = require('bcryptjs');

class BcryptHelper {
  static hashingPassword(password) {
    const salt = bcrypt.genSaltSync(+process.env.SALT);
    return bcrypt.hashSync(password, salt);
  }

  static validatePassword(password, hashed) {
    return bcrypt.compareSync(password, hashed);
  }
}

module.exports = BcryptHelper;
