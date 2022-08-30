const mongoose = require("mongoose");

const jobSheetSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const jobSheet = mongoose.model("jobSheet", jobSheetSchema);
module.exports = jobSheet;
