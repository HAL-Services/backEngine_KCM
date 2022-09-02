const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    default: 5,
  },
  status: {
    type: Boolean,
    default: false,
  },
});
const Reviews = mongoose.model("Reviews", reviewSchema);
module.exports = Reviews;
