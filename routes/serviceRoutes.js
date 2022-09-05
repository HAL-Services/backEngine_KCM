const { Router } = require("express");
const serviceController = require("../controllers/serviceController");
const auth = require("../middleware/authMiddleware");
const router = Router();

router.post("/services/create", auth, serviceController.createService);
router.post("/services/update", auth, serviceController.updateServiceStatus);
router.get("/services/pending", auth, serviceController.getPendingServices);
router.get(
  "/services/details",
  auth,
  serviceController.getPendingServiceByUser
);

module.exports = router;
