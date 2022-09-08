const { Router } = require("express");
const serviceController = require("../controllers/serviceController");
const auth = require("../middleware/authMiddleware");
const router = Router();

router.post("/services/create", auth, serviceController.createService);
router.post("/services/update", auth, serviceController.updateServiceStatus);
router.get("/services/pending", auth, serviceController.getPendingServices);
router.get("/services/active", auth, serviceController.getActiveServices);
router.get("/services/completed", auth, serviceController.getCompletedServices);
router.get("/services/details", auth, serviceController.getServiceByUser);
router.post("/services/user/details", auth, serviceController.getServiceForUser);
router.delete("/services/delete", auth, serviceController.cancleService);
module.exports = router;
