const { Router } = require("express");
const userController = require("../controllers/userController");
const router = Router();
const auth = require("../middleware/authMiddleware");

router.post("/users/update", auth, userController.updateProfile);
router.get("/users/details", auth, userController.getUserDetails);
router.get("/users/count", auth, userController.getCountOfUsers);
router.get("/users/all", auth, userController.getAllUsers);
router.get("/users/stats", auth, userController.getUserStats);
router.get("/users/:id", auth, userController.getUserById);
router.post("/users/forgot", userController.forgotPassword);
router.post("/users/check", userController.checkPassword);

module.exports = router;
