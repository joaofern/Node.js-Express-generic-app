const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const userValidations = require("../validations/user");
const auth = require("../middleware/auth");

router.post(
  "/",
  userValidations.validate("createUser"),
  userController.createUser
);
router.put(
  "/:id",
  auth,
  userValidations.validate("updateUser"),
  userController.updateUser
);
router.delete("/:id", auth, userController.deleteUser);

module.exports = router;
