const mongoose = require("mongoose");
const carsSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: true,
    },
    car_number: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    owner: { type: mongoose.Schema.Types.Object, ref: "User" },
  },
  { timestamps: true }
);
const Cars = mongoose.model("Cars", carsSchema);
module.exports = Cars;
