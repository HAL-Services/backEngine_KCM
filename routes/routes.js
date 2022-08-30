const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

/// creating routes
router.post("/signup", authController.signUp_post);
router.get("/stats/", authController.Stats);
router.post("/login", authController.login);

module.exports = router;
