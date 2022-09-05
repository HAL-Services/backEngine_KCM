const User = require("../models/user_schema");
const router = require("express").Router();

// for signup
module.exports.signUp_post = async (req, res) => {
  const { username, mobile, email, password } = req.body;
  const userExists = await User.findOne({ email });
  try {
    if (userExists) {
      res.status(400);
      throw new Error("User Already Exists");
    }
    const user = await User.create({
      username,
      mobile,
      email,
      password,
    });
    res.status(201).json({ id: user._id, user });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

// for login
module.exports.login = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findByCredentials(email, req.body.password);
    const token = await user.generateAuthToken();
    const { password, createdAt, updatedAt, isAdmin, __v, ...others } =
      user._doc;

    res.send({ ...others, token });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

// log out
module.exports.logout = async (req, res) => {
  try {
    req.user.token = null;
    res.send();
  } catch (error) {
    req.status(500).send();
  }
};
