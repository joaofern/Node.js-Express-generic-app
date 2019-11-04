const config = require("config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const _ = require("lodash");

exports.login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        message: "Parameter missing"
      });
    }
    let user = await userModel
      .findOne({
        email: req.body.email
      })
      .select("+password");
    if (!user)
      return res.status(401).json({
        message: "Invalid user or password."
      });
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).json({
        message: "Invalid user or password."
      });
    const token = jwt.sign(
      _.pick(user, ["_id", "name", "email", "role"]),
      config.get("jwtPrivateKey"),
      {
        expiresIn: "1h"
      }
    );

    return res.status(200).json({
      "x-auth-token": token
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};
exports.check = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role
  };
  return res.status(200).json({
    user
  });
};
