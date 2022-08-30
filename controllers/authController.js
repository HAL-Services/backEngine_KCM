const User = require("../models/user_schema");
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
    const token = await user.generateAuthToken();
    res.status(201).json({ id: user._id, token });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

// for login
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

// log out
module.exports.logout = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    req.status(500).send();
  }
};

