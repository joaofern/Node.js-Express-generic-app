const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const { validationResult } = require("express-validator");

exports.createUser = async (req, res) => {
  try {
    //Body validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array({ onlyFirstError: true }));
    }
    //Check if user exists
    const dbUser = await userModel.findOne({
      email: req.body.email
    });
    if (dbUser) {
      return res.status(409).json({
        message: "User already registered."
      });
    }
    const user = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      country: req.body.country
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    return res.status(201).json({ message: "User created." });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    //Check if user exists
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }
    //Body validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array({ onlyFirstError: true }));
    }
    //Authorization
    if (req.user._id !== user.id && req.user.role !== 1) {
      return res.status(403).json({
        message: "Unauthorized."
      });
    }
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }
    if (req.body.role && req.user.role === 1) {
      user.role = req.body.role;
    }
    if (req.body.country) user.country = req.body.country;
    await user.save();
    return res.status(200).json({ message: "User updated." });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    //Check if user exists
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }
    //Authorization
    if (req.user._id !== user.id && req.user.role !== 1) {
      return res.status(403).json({
        message: "Unauthorized."
      });
    }
    await user.remove();
    return res.status(200).json({ message: "User removed." });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};
