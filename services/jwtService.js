const jwt = require("jsonwebtoken");

module.exports = {
  isValid(token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return true;
    } catch (err) {
      return false;
    }
  },
};
