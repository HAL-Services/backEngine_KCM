const { Router } = require("express");
const reviewController = require("../controllers/reviewController");
const auth = require("../middleware/authMiddleware");
const router = Router();

router.post("/reviews/create", reviewController.createReview);
router.post("/reviews/update", auth, reviewController.updateReview);
router.get("/reviews/filtered", reviewController.getOnSiteReviews);
router.get("/reviews/pending", auth, reviewController.getPendingReviews);
router.get("/reviews/all", auth, reviewController.getReviews);
router.delete("/reviews/delete", auth, reviewController.deleteReview);

module.exports = router;
