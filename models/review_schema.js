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
  image: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
  },
});
const Reviews = mongoose.model("Reviews", reviewSchema);
module.exports = Reviews;
