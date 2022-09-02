const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const serviceController = require("../controllers/serviceController");
const reviewController = require("../controllers/reviewController");
/// creating routes

// auth routes
router.post("/signup", authController.signUp_post);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

// user details  routes
router.post("/update", auth, userController.updateProfile);
router.get("/details", auth, userController.getUserDetails);

// service routes
router.post("/service/create", auth, serviceController.createService);
router.post("/service/update", auth, serviceController.updateServiceStatus);
router.get("/service/pending", auth, serviceController.getPendingServices);
router.get("/service/details", auth, serviceController.getPendingServiceByUser);

// review routes
router.post("/review/create", reviewController.createReview);
router.post("/review/update", reviewController.updateReview);
router.get("/review/details", reviewController.getReviews);

// exporting router
module.exports = router;
