const { Router } = require("express");
const serviceController = require("../controllers/serviceController");
const auth = require("../middleware/authMiddleware");
const multer = require("multer");
const router = Router();
const upload = multer({
  limits: {
    filesize: 2000000,
  },
  // fileFilter(req, file, cb) {
  //   cb(undefined, true);
  // },
});
router.post("/services/create", auth, serviceController.createService);
router.post("/services/update", auth, serviceController.updateServiceStatus);
router.get("/services/pending", auth, serviceController.getPendingServices);
router.get("/services/active", auth, serviceController.getActiveServices);
router.get("/services/completed", auth, serviceController.getCompletedServices);
router.get("/services/details", auth, serviceController.getServiceByUser);
router.get("/services/count", auth, serviceController.getCountofServices);
router.get(
  "/services/latest/all",
  auth,
  serviceController.getAllLatestServices
);
router.post(
  "/services/user/details",
  auth,
  serviceController.getServiceForUser
);

router.post(
  "/services/upload/bill",
  auth,
  upload.single("bill"),
  serviceController.uploadBill,
  (error, req, res, next) => {
    res.status(400).json({ error: error.message });
  }
);
router.get("/services/view/:id/bill", serviceController.getBill);
router.delete("/services/delete", auth, serviceController.cancleService);
module.exports = router;
