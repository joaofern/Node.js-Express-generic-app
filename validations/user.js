const { check } = require("express-validator");
const userModel = require("../models/user");

exports.validate = method => {
  switch (method) {
    case "createUser": {
      return [
        check("name", "Name is required.")
          .exists()
          .isLength({ min: 4, max: 25 })
          .withMessage("Name must have between 4 and 25 characters."),
        check("email", "Email is required.")
          .exists()
          .isEmail(),
        check("password", "Password is required.")
          .exists()
          .isLength({ min: 5, max: 100 })
          .withMessage("Name must have between 5 and 100 characters."),
        check("role", "Role is required.")
          .optional()
          .isIn([1, 2])
          .withMessage("Invalid role."),
        check("country", "Country is required.")
          .exists()
          .isIn(["PT"])
          .withMessage("Invalid country.")
      ];
    }
    case "updateUser": {
      return [
        check("name")
          .optional()
          .isLength({ min: 4, max: 25 })
          .withMessage("Name must have between 4 and 25 characters."),
        check("email")
          .optional()
          .isEmail(),
        check("password")
          .optional()
          .isLength({ min: 5, max: 100 })
          .withMessage("Name must have between 5 and 100 characters."),
        check("role")
          .optional()
          .isIn([1, 2])
          .withMessage("Invalid role."),
        check("country")
          .optional()
          .isIn(["PT"])
          .withMessage("Invalid country.")
      ];
    }
  }
};
