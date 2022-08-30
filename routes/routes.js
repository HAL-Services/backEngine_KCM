const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
/// creating routes
router.post("/signup", authController.signUp_post);
router.post("/login", authController.login);
router.post("/logout", auth, authController.logout);
router.post("/update", auth, userController.updateProfile);
module.exports = router;
