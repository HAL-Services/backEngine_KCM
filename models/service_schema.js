const mongoose = require("mongoose");

const { isEmail } = require("validator");
const serviceSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: [isEmail, "invalid email"],
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    carNumber: {
      type: String,
      required: true,
    },
    carModel: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    booking: {
      type: String,
      default: "Pending",
    },
    
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
