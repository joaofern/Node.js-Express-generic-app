const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({
      message: "Access denied."
    });
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    return next();
  } catch (error) {
    res.json({
      message: "Invalid token."
    });
  }
};
