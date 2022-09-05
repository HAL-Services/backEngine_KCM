const { Router } = require("express");
const userController = require("../controllers/userController");
const router = Router();
const auth = require("../middleware/authMiddleware");

router.post("/users/update", auth, userController.updateProfile);
router.get("/users/details", auth, userController.getUserDetails);
router.get("/users/all", auth, userController.getAllUsers);
router.get("/users/stats", auth, userController.getUserStats);
module.exports = router;
