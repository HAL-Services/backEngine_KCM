const mongoose = require("mongoose");
const { isEmail } = require("validator");
const billsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: [isEmail, "invalid email"],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Bills = mongoose.model("Bills", billsSchema);
module.exports = Bills;
