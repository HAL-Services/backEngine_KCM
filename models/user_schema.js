const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    phone_number: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      validate: [isEmail, "invalid email"],
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);


const User = mongoose.model("User", userSchema);
module.exports = User;
