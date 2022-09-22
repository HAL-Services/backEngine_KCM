const User = require("../models/user_schema");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
// get single user
module.exports.getUserDetails = async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403).json("Access Denied");
    return;
  }
  try {
    const username = req.user.username;
    const email = req.user.email;
    const mobile = req.user.mobile;
    res.status(200).send({ username, email, mobile });
  } catch (err) {
    res.status(404).send({ error: err.message, message: "User not found" });
  }
};
module.exports.getCountOfUsers = async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403).json("ACCESS DENIED");
    return;
  }
  try {
    const allUsers = await User.find();
    res.status(200).json({ count: allUsers.length });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
// get all users
module.exports.getAllUsers = async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403).json("Access Denied");
    return;
  }
  const query = req.query.new;

  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// get user by Id
module.exports.getUserById = async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403).json("ACCESS DENIED");
    return;
  }
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      res.status(404).json("NO USER FOUND");
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// get users stats
module.exports.getUserStats = async (req, res) => {
  if (!req.user.isAdmin) {
    res.status(403).json("Access Denied");
    return;
  }
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

// update user profile
module.exports.updateProfile = async (req, res) => {
  if (
    req.user.isAdmin === false &&
    (req.body.isAdmin === true || req.body.isAdmin === "true")
  ) {
    res.status(403).json("Access Denied");
    return;
  }
  try {
    const id = req.user._id.toHexString();
    const { mobile, username, email } = req.body;
    await User.findByCredentials(email, req.body.password);
    if (req.body.newPassword) {
      req.body.newPassword = await bcrypt.hash(req.body.newPassword, 8);
      const updatedUser = await User.findByIdAndUpdate(id, {
        $set: req.body,
      });

      if (updatedUser) {
        res
          .status(201)
          .send({ username: updatedUser.username, mobile: updatedUser.mobile });
      } else {
        res.status(400).send({ error: "Please try again" });
      }
    } else {
      const updatedUser = await User.findByIdAndUpdate(id, {
        username,
        mobile,
      });
      if (updatedUser)
        res
          .status(201)
          .json({ username: updatedUser.username, mobile: updatedUser.mobile });
      else res.status(400).send({ error: "Please try again" });
    }
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

// forgot password
module.exports.forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("Please register first");
    const id = user._id.toHexString();
    const token = crypto.randomBytes(64).toString("hex");
    let link = `${id}/${token}`;
    res.status(200).send(link);
  } catch (err) {
    res.status(401).send({ error: err.message });
  }
};

// New password check
module.exports.checkPassword = async (req, res) => {
  try {
    const { id } = req.body;
    const password = await bcrypt.hash(req.body.newPass, 8);
    const user = await User.findByIdAndUpdate(
      { _id: id },
      { password: password },
      { new: true }
    );
    return res.status(200).send({ message: "Successfully changed password" });
  } catch (err) {
    res.status(401).send({ error: err.message });
  }
};
