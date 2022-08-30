const User = require("../models/user_schema");
const Cars = require("../models/cars_schema");
const router = require("express").Router();

// for signup
module.exports.signUp_post = async (req, res) => {
  const { username, mobile, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      mobile,
      email,
      password,
    });
    res.status(201).json({ id: user._id });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

// for login
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    res.send(user);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

// for admin getting all users
module.exports.Stats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const cars = await Cars.countDocuments();
    res
      .status(200)
      .send({ data: { user: users, car: cars }, data_found: true });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
