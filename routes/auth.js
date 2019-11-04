const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/check", auth, authController.check);
router.post("/", authController.login);

module.exports = router;
