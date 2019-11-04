const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  try {
    if (req.user.role === 2) {
      return next();
    } else {
      return res.status(401).json({
        message: "Unauthorized."
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};
