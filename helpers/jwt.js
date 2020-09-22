const jwt = require('jsonwebtoken');

class JWTHelper {
  static signToken(payload) {
    const token = jwt.sign(payload, process.env.SECRET);
    return token
  }

  static verifyToken(token) {
    const decoded = jwt.verify(token, process.env.SECRET); 
    return decoded;
  }
}

module.exports = JWTHelper;
