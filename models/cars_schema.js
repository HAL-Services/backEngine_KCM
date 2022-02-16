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
    },
    username: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
const Cars = mongoose.model("Cars", carsSchema);
module.exports = Cars;
