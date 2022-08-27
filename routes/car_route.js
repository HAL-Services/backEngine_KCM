const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");

router.get("/", (req, res) => {
  res.send("hello world");
});
router.post("/create/", carController.post_cars);
router.get("/all/", carController.get_cars);
router.get("/number/", carController.getCar_ByNumber);

module.exports = router;
