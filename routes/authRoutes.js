const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// auth routes
router.post("/signup", authController.signUp_post);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/admin/login", authController.adminLogin);

// exporting router
module.exports = router;
